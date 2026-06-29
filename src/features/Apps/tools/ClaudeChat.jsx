import { useEffect, useRef, useState } from 'react'
import { Field, TextArea, Btn, Note, SegmentedControl } from '../toykit'
import Markdown from './Markdown'
import { trackEvent } from '../../../utils/analytics'
import {
  MODELS,
  modelFor,
  resolveKey,
  getStoredKey,
  setStoredKey,
  hasEnvKey,
  makeClient,
} from './claudeClient'

const DEFAULT_SYSTEM = 'You are Claude, a helpful, concise assistant.'

/* Estimate cost in USD from a Messages API usage object. Cache reads bill at ~0.1x
   input and cache writes at ~1.25x, per the pricing docs. */
function costForTurn(usage, model) {
  const { inPrice, outPrice } = modelFor(model)
  const input = usage.input_tokens || 0
  const cacheRead = usage.cache_read_input_tokens || 0
  const cacheWrite = usage.cache_creation_input_tokens || 0
  const output = usage.output_tokens || 0
  const inUsd = ((input + cacheWrite * 1.25 + cacheRead * 0.1) * inPrice) / 1e6
  const outUsd = (output * outPrice) / 1e6
  return { inTok: input + cacheRead + cacheWrite, outTok: output, usd: inUsd + outUsd }
}

/* Build the message history one model sees. `turns` ends at the latest user turn
   (no in-flight assistant). For each prior assistant turn, prefer this model's own
   reply so each model stays in its own conversation; fall back to any reply so the
   thread alternates correctly even for a model added mid-conversation. */
function buildHistory(turns, modelId) {
  return turns.map((t) => {
    if (t.role === 'user') return { role: 'user', content: t.content }
    const r =
      t.responses.find((x) => x.model === modelId && x.content) ||
      t.responses.find((x) => x.content)
    return { role: 'assistant', content: r?.content || '(no response)' }
  })
}

// Full class strings (not interpolated) so Tailwind's purge keeps them.
const ACCENT = {
  clay: { badge: 'bg-clay/15 text-clay-deep', dot: 'bg-clay' },
  ocean: { badge: 'bg-ocean/15 text-ocean', dot: 'bg-ocean' },
  sage: { badge: 'bg-sage/15 text-sage', dot: 'bg-sage' },
}

function ModelBadge({ modelId }) {
  const m = modelFor(modelId)
  const a = ACCENT[m.accent] || ACCENT.clay
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} aria-hidden />
      {m.label}
    </span>
  )
}

function ResponseBody({ text, thinking, error }) {
  return (
    <>
      {thinking && (
        <details className="mb-2 text-[0.85rem]">
          <summary className="cursor-pointer font-medium text-muted">Thinking</summary>
          <p className="mt-1 whitespace-pre-wrap border-l-2 border-line pl-3 font-sans italic text-muted">
            {thinking}
          </p>
        </details>
      )}
      {text && <Markdown>{text}</Markdown>}
      {error && <Note tone="error">{error}</Note>}
      {!text && !error && (
        <span className="inline-flex gap-1 text-muted" aria-label="Claude is typing">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
        </span>
      )}
    </>
  )
}

function UserBubble({ text }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-2xl bg-clay px-4 py-3 text-[0.95rem] leading-relaxed text-white">
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  )
}

const GRID_COLS = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3' }

function AssistantTurn({ responses }) {
  // Single model → a left-aligned chat bubble. Multiple → a comparison grid.
  if (responses.length === 1) {
    const r = responses[0]
    return (
      <div className="flex justify-start">
        <div className="max-w-[85%] rounded-2xl border border-line bg-white/70 px-4 py-3 text-[0.95rem] leading-relaxed text-ink">
          <div className="mb-1.5">
            <ModelBadge modelId={r.model} />
          </div>
          <ResponseBody text={r.content} thinking={r.thinking} error={r.error} />
        </div>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 gap-3 ${GRID_COLS[Math.min(responses.length, 3)] || ''}`}>
      {responses.map((r) => (
        <div
          key={r.model}
          className="flex flex-col rounded-2xl border border-line bg-white/70 px-4 py-3 text-[0.95rem] leading-relaxed text-ink"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <ModelBadge modelId={r.model} />
            {r.usage && (
              <span className="text-[0.7rem] tabular-nums text-muted">
                {r.usage.outTok.toLocaleString()} tok
              </span>
            )}
          </div>
          <ResponseBody text={r.content} thinking={r.thinking} error={r.error} />
        </div>
      ))}
    </div>
  )
}

function KeySetup({ initial, onSave }) {
  const [value, setValue] = useState(initial || '')
  return (
    <div className="rounded-2xl border border-line bg-white/60 p-5">
      <h3 className="font-serif text-lg font-semibold text-ink">Bring your own Anthropic key</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        This playground calls the Claude API directly from your browser, so it needs an API key.
        Paste one below — it’s stored only in this browser’s local storage and sent only to{' '}
        <code className="font-mono text-[0.8rem]">api.anthropic.com</code>. Get one from the{' '}
        <a
          href="https://console.anthropic.com/settings/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-clay-deep underline-offset-2 hover:underline"
        >
          Anthropic Console
        </a>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="sk-ant-…"
          spellCheck={false}
          className="w-full rounded-xl border border-line bg-white/70 px-4 py-2.5 font-mono text-[0.85rem] text-ink placeholder-muted/60 focus:border-clay focus:outline-none"
        />
        <Btn onClick={() => onSave(value.trim())} disabled={!value.trim()} className="shrink-0">
          Save key
        </Btn>
      </div>
    </div>
  )
}

export default function ClaudeChat() {
  const [key, setKey] = useState(() => resolveKey())
  const [editingKey, setEditingKey] = useState(false)
  // Default to Haiku — cheapest/fastest — so nobody racks up Opus cost by accident.
  const [model, setModel] = useState('claude-haiku-4-5')
  const [compare, setCompare] = useState(false)
  const [compareModels, setCompareModels] = useState(['claude-haiku-4-5'])
  const [thinking, setThinking] = useState(false)
  const [system, setSystem] = useState(DEFAULT_SYSTEM)
  const [turns, setTurns] = useState([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState('')
  const [totals, setTotals] = useState({ inTok: 0, outTok: 0, usd: 0 })

  const streamsRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [turns, streaming])

  const saveKey = (k) => {
    setStoredKey(k)
    setKey(k || resolveKey())
    setEditingKey(false)
  }

  const reset = () => {
    if (streaming) return
    setTurns([])
    setError('')
    setTotals({ inTok: 0, outTok: 0, usd: 0 })
  }

  const stop = () => {
    streamsRef.current?.forEach((s) => s.abort())
  }

  const toggleCompareModel = (id) =>
    setCompareModels((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const activeModels = compare
    ? MODELS.filter((m) => compareModels.includes(m.id)).map((m) => m.id) // keep palette order
    : [model]

  const send = async () => {
    const text = input.trim()
    if (!text || streaming || !key) return
    if (!activeModels.length) {
      setError('Pick at least one model.')
      return
    }

    setError('')
    setInput('')
    const baseTurns = [...turns, { role: 'user', content: text }]
    const placeholder = {
      role: 'assistant',
      responses: activeModels.map((m) => ({ model: m, content: '', thinking: '' })),
    }
    setTurns([...baseTurns, placeholder])
    setStreaming(true)
    trackEvent('app_use', {
      app_slug: 'claude-chat',
      app_action: compare ? 'compare' : 'send',
      model: activeModels.join(','),
    })

    // Patch one model's response in the last (in-flight) assistant turn.
    const patch = (modelId, fn) =>
      setTurns((prev) => {
        const next = prev.slice()
        const last = { ...next[next.length - 1] }
        last.responses = last.responses.map((r) => (r.model === modelId ? { ...r, ...fn(r) } : r))
        next[next.length - 1] = last
        return next
      })

    const streams = new Map()
    streamsRef.current = streams

    const runModel = async (modelId) => {
      try {
        const client = makeClient(key)
        const stream = client.messages.stream({
          model: modelId,
          max_tokens: 8192,
          system,
          ...(thinking ? { thinking: { type: 'adaptive', display: 'summarized' } } : {}),
          messages: buildHistory(baseTurns, modelId),
        })
        streams.set(modelId, stream)

        for await (const event of stream) {
          if (event.type === 'content_block_delta') {
            if (event.delta.type === 'text_delta') {
              patch(modelId, (r) => ({ content: r.content + event.delta.text }))
            } else if (event.delta.type === 'thinking_delta') {
              patch(modelId, (r) => ({ thinking: (r.thinking || '') + event.delta.thinking }))
            }
          }
        }

        const final = await stream.finalMessage()
        if (final?.usage) {
          const t = costForTurn(final.usage, modelId)
          patch(modelId, () => ({ usage: t }))
          setTotals((prev) => ({
            inTok: prev.inTok + t.inTok,
            outTok: prev.outTok + t.outTok,
            usd: prev.usd + t.usd,
          }))
        }
      } catch (err) {
        const aborted = err?.name === 'AbortError' || /abort/i.test(err?.message || '')
        if (!aborted) patch(modelId, () => ({ error: err?.message || 'API error.' }))
      } finally {
        streams.delete(modelId)
      }
    }

    await Promise.all(activeModels.map(runModel))
    streamsRef.current = null
    setStreaming(false)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  if (!key && !editingKey) {
    return <KeySetup initial={getStoredKey()} onSave={saveKey} />
  }

  const keySource = getStoredKey() ? 'your saved key' : hasEnvKey() ? '.env.local' : 'none'

  return (
    <div className="flex flex-col gap-5">
      {editingKey && <KeySetup initial={getStoredKey()} onSave={saveKey} />}

      {/* Controls */}
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white/50 p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
            <Field label={compare ? 'Models to compare' : 'Model'}>
              {compare ? (
                <div className="flex flex-wrap gap-1.5">
                  {MODELS.map((m) => {
                    const on = compareModels.includes(m.id)
                    return (
                      <button
                        key={m.id}
                        onClick={() => toggleCompareModel(m.id)}
                        className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                          on
                            ? 'border-transparent bg-clay text-white'
                            : 'border-line bg-white/60 text-ink-soft hover:text-clay-deep'
                        }`}
                      >
                        {m.label}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <SegmentedControl
                  options={MODELS.map((m) => ({ value: m.id, label: m.label }))}
                  value={model}
                  onChange={setModel}
                />
              )}
            </Field>
            <label className="flex cursor-pointer items-center gap-2 pb-2 text-sm font-medium text-ink-soft">
              <input
                type="checkbox"
                checked={compare}
                onChange={(e) => setCompare(e.target.checked)}
                className="h-4 w-4 accent-clay"
              />
              Compare models
            </label>
            <label className="flex cursor-pointer items-center gap-2 pb-2 text-sm font-medium text-ink-soft">
              <input
                type="checkbox"
                checked={thinking}
                onChange={(e) => setThinking(e.target.checked)}
                className="h-4 w-4 accent-clay"
              />
              Extended thinking
            </label>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="hidden sm:inline">key: {keySource}</span>
            <button
              onClick={() => setEditingKey((v) => !v)}
              className="font-medium hover:text-clay-deep"
            >
              {editingKey ? 'Close' : 'Change key'}
            </button>
            <button
              onClick={reset}
              disabled={streaming || !turns.length}
              className="font-medium hover:text-clay-deep disabled:opacity-40"
            >
              Clear
            </button>
          </div>
        </div>
        {compare && (
          <p className="text-xs text-muted">
            Each message is sent to every selected model at once; their replies stream in
            side by side.
          </p>
        )}
      </div>

      <Field label="System prompt" hint="Sets Claude’s behavior for this chat">
        <TextArea
          rows={2}
          mono={false}
          value={system}
          onChange={(e) => setSystem(e.target.value)}
          placeholder="You are a helpful assistant…"
        />
      </Field>

      {/* Conversation */}
      <div
        ref={scrollRef}
        className="flex max-h-[60vh] min-h-[16rem] flex-col gap-3 overflow-y-auto rounded-2xl border border-line bg-cream/40 p-4"
      >
        {turns.length === 0 ? (
          <div className="m-auto max-w-sm text-center text-sm text-muted">
            Start a conversation with Claude. Pick a model — or turn on{' '}
            <span className="font-medium text-ink-soft">Compare models</span> to send the same
            prompt to several at once and watch their replies stream in side by side.
          </div>
        ) : (
          turns.map((t, i) =>
            t.role === 'user' ? (
              <UserBubble key={i} text={t.content} />
            ) : (
              <AssistantTurn key={i} responses={t.responses} />
            )
          )
        )}
      </div>

      {error && <Note tone="error">{error}</Note>}

      {/* Composer */}
      <div className="flex items-end gap-3">
        <TextArea
          rows={2}
          mono={false}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Message Claude…  (Enter to send, Shift+Enter for newline)"
          className="flex-1"
        />
        {streaming ? (
          <Btn variant="ghost" onClick={stop} className="shrink-0">
            <i className="fas fa-stop" aria-hidden /> Stop
          </Btn>
        ) : (
          <Btn onClick={send} disabled={!input.trim()} className="shrink-0">
            <i className="fas fa-paper-plane" aria-hidden /> {compare ? 'Compare' : 'Send'}
          </Btn>
        )}
      </div>

      {/* Usage */}
      {totals.outTok > 0 && (
        <p className="text-right text-xs text-muted">
          Session: {totals.inTok.toLocaleString()} in / {totals.outTok.toLocaleString()} out ·
          ~${totals.usd < 0.01 ? totals.usd.toFixed(4) : totals.usd.toFixed(2)}
        </p>
      )}
    </div>
  )
}
