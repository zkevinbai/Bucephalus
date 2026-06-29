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

const DEFAULT_SYSTEM =
  'You are a research agent. Before answering, use the web_search tool to find current, accurate information — search more than once if the question has multiple parts. Ground every claim in what you find, prefer primary sources, and keep the final answer concise and factual.'

// Server-side web search runs on Anthropic's infrastructure — Claude decides
// when and what to search; results stream back. max_uses bounds cost per run.
const WEB_SEARCH = { type: 'web_search_20250305', name: 'web_search', max_uses: 5 }

const MAX_TURNS = 6 // safety bound on the pause_turn continuation loop

function costFor(usage, model) {
  const { inPrice, outPrice } = modelFor(model)
  const input = (usage.input_tokens || 0) + (usage.cache_read_input_tokens || 0) + (usage.cache_creation_input_tokens || 0)
  const output = usage.output_tokens || 0
  return { inTok: input, outTok: output, usd: (input * inPrice + output * outPrice) / 1e6 }
}

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function KeySetup({ initial, onSave }) {
  const [value, setValue] = useState(initial || '')
  return (
    <div className="rounded-2xl border border-line bg-white/60 p-5">
      <h3 className="font-serif text-lg font-semibold text-ink">Bring your own Anthropic key</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        The agent calls the Claude API directly from your browser, so it needs an API key. It’s
        stored only in this browser’s local storage and sent only to{' '}
        <code className="font-mono text-[0.8rem]">api.anthropic.com</code>. Get one from the{' '}
        <a
          href="https://console.anthropic.com/settings/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-clay-deep underline-offset-2 hover:underline"
        >
          Anthropic Console
        </a>
        . Note: web search is a billed server tool.
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

function SearchChip({ query }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-line bg-white/60 px-3.5 py-2.5">
      <i className="fas fa-magnifying-glass mt-0.5 text-sm text-ocean" aria-hidden />
      <span className="text-[0.9rem] text-ink">
        <span className="font-medium text-muted">Searched</span> “{query}”
      </span>
    </div>
  )
}

export default function ClaudeAgent() {
  const [key, setKey] = useState(() => resolveKey())
  const [editingKey, setEditingKey] = useState(false)
  const [model, setModel] = useState('claude-haiku-4-5')
  const [thinking, setThinking] = useState(false)
  const [system, setSystem] = useState(DEFAULT_SYSTEM)
  const [goal, setGoal] = useState('')
  const [running, setRunning] = useState(false)
  const [error, setError] = useState('')

  // Run state
  const [steps, setSteps] = useState([]) // [{ kind:'search', query } | { kind:'think', text }]
  const [sources, setSources] = useState([]) // [{ title, url }]
  const [answer, setAnswer] = useState('')
  const [totals, setTotals] = useState({ inTok: 0, outTok: 0, usd: 0, searches: 0 })

  const streamRef = useRef(null)
  const traceRef = useRef(null)

  useEffect(() => {
    const el = traceRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [steps, answer, running])

  const saveKey = (k) => {
    setStoredKey(k)
    setKey(k || resolveKey())
    setEditingKey(false)
  }

  const stop = () => streamRef.current?.abort()

  const run = async () => {
    const task = goal.trim()
    if (!task || running || !key) return

    setError('')
    setSteps([])
    setSources([])
    setAnswer('')
    setTotals({ inTok: 0, outTok: 0, usd: 0, searches: 0 })
    setRunning(true)
    trackEvent('toy_use', { toy_slug: 'research-agent', toy_action: 'run', model })

    const addSources = (results) => {
      if (!Array.isArray(results)) return
      setSources((prev) => {
        const seen = new Set(prev.map((s) => s.url))
        const next = [...prev]
        for (const r of results) {
          if (r?.url && !seen.has(r.url)) {
            seen.add(r.url)
            next.push({ title: r.title || domainOf(r.url), url: r.url })
          }
        }
        return next
      })
    }

    const messages = [{ role: 'user', content: task }]

    try {
      const client = makeClient(key)
      let turns = 0

      while (turns++ < MAX_TURNS) {
        const stream = client.messages.stream({
          model,
          max_tokens: 4096,
          system,
          tools: [WEB_SEARCH],
          ...(thinking ? { thinking: { type: 'adaptive', display: 'summarized' } } : {}),
          messages,
        })
        streamRef.current = stream

        const blocks = {} // index -> { type, name, json }

        for await (const ev of stream) {
          if (ev.type === 'content_block_start') {
            const b = ev.content_block
            blocks[ev.index] = { type: b.type, name: b.name, json: '' }
            if (b.type === 'web_search_tool_result') addSources(b.content)
          } else if (ev.type === 'content_block_delta') {
            if (ev.delta.type === 'text_delta') {
              setAnswer((a) => a + ev.delta.text)
            } else if (ev.delta.type === 'thinking_delta') {
              setSteps((s) => {
                const next = s.slice()
                const last = next[next.length - 1]
                if (last?.kind === 'think') next[next.length - 1] = { ...last, text: last.text + ev.delta.thinking }
                else next.push({ kind: 'think', text: ev.delta.thinking })
                return next
              })
            } else if (ev.delta.type === 'input_json_delta') {
              const b = blocks[ev.index]
              if (b) b.json += ev.delta.partial_json
            }
          } else if (ev.type === 'content_block_stop') {
            const b = blocks[ev.index]
            if (b?.type === 'server_tool_use' && b.name === 'web_search') {
              try {
                const q = JSON.parse(b.json).query
                if (q) {
                  setSteps((s) => [...s, { kind: 'search', query: q }])
                  setTotals((t) => ({ ...t, searches: t.searches + 1 }))
                }
              } catch {
                /* partial JSON — skip */
              }
            }
          }
        }

        const final = await stream.finalMessage()
        if (final?.usage) {
          const c = costFor(final.usage, model)
          setTotals((t) => ({ ...t, inTok: t.inTok + c.inTok, outTok: t.outTok + c.outTok, usd: t.usd + c.usd }))
        }
        messages.push({ role: 'assistant', content: final.content })

        // Server tools may pause the turn at the internal iteration cap — re-send
        // to let Claude continue. Any other stop reason ends the run.
        if (final.stop_reason !== 'pause_turn') break
      }
    } catch (err) {
      const aborted = err?.name === 'AbortError' || /abort/i.test(err?.message || '')
      if (!aborted) setError(err?.message || 'Something went wrong running the agent.')
    } finally {
      streamRef.current = null
      setRunning(false)
    }
  }

  if (!key && !editingKey) {
    return <KeySetup initial={getStoredKey()} onSave={saveKey} />
  }

  const keySource = getStoredKey() ? 'your saved key' : hasEnvKey() ? '.env.local' : 'none'
  const idle = !running && !steps.length && !answer

  return (
    <div className="flex flex-col gap-5">
      {editingKey && <KeySetup initial={getStoredKey()} onSave={saveKey} />}

      {/* Controls */}
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white/50 p-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <Field label="Model">
            <SegmentedControl
              options={MODELS.map((m) => ({ value: m.id, label: m.label }))}
              value={model}
              onChange={setModel}
            />
          </Field>
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
          <button onClick={() => setEditingKey((v) => !v)} className="font-medium hover:text-clay-deep">
            {editingKey ? 'Close' : 'Change key'}
          </button>
        </div>
      </div>

      <Field label="System prompt" hint="How the agent should behave">
        <TextArea rows={2} mono={false} value={system} onChange={(e) => setSystem(e.target.value)} />
      </Field>

      {/* Task */}
      <Field label="Research task" hint="Enter to run, Shift+Enter for newline">
        <div className="flex items-end gap-3">
          <TextArea
            rows={2}
            mono={false}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                run()
              }
            }}
            placeholder="e.g. What did Anthropic announce most recently, and when?"
            className="flex-1"
          />
          {running ? (
            <Btn variant="ghost" onClick={stop} className="shrink-0">
              <i className="fas fa-stop" aria-hidden /> Stop
            </Btn>
          ) : (
            <Btn onClick={run} disabled={!goal.trim()} className="shrink-0">
              <i className="fas fa-wand-magic-sparkles" aria-hidden /> Run
            </Btn>
          )}
        </div>
      </Field>

      {error && <Note tone="error">{error}</Note>}

      {/* Trace + answer */}
      {!idle && (
        <div
          ref={traceRef}
          className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto rounded-2xl border border-line bg-cream/40 p-4"
        >
          {/* Step timeline */}
          {steps.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">Agent steps</p>
              {steps.map((s, i) =>
                s.kind === 'search' ? (
                  <SearchChip key={i} query={s.query} />
                ) : (
                  <details key={i} className="rounded-xl border border-line bg-white/50 px-3.5 py-2.5 text-[0.85rem]">
                    <summary className="cursor-pointer font-medium text-muted">Thinking</summary>
                    <p className="mt-1 whitespace-pre-wrap italic text-muted">{s.text}</p>
                  </details>
                )
              )}
              {running && (
                <div className="flex items-center gap-2 px-1 text-sm text-muted">
                  <i className="fas fa-circle-notch fa-spin text-ocean" aria-hidden /> Working…
                </div>
              )}
            </div>
          )}

          {/* Answer */}
          {answer && (
            <div className="rounded-2xl border border-line bg-white/70 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-clay">Answer</p>
              <Markdown className="text-[0.95rem] leading-relaxed text-ink">{answer}</Markdown>
            </div>
          )}

          {/* Sources */}
          {sources.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">
                Sources ({sources.length})
              </p>
              <ol className="flex flex-col gap-1.5">
                {sources.map((s, i) => (
                  <li key={s.url} className="flex gap-2 text-[0.85rem] leading-snug">
                    <span className="tabular-nums text-muted">{i + 1}.</span>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink underline-offset-2 hover:text-clay-deep hover:underline"
                    >
                      {s.title}
                      <span className="ml-1.5 text-muted">— {domainOf(s.url)}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {idle && (
        <div className="rounded-2xl border border-dashed border-line bg-cream/30 p-6 text-center text-sm text-muted">
          Give the agent a research task. It’ll decide what to search, run live web searches, and
          come back with a cited answer — watch its steps as it works.
        </div>
      )}

      {/* Usage */}
      {(totals.outTok > 0 || totals.searches > 0) && (
        <p className="text-right text-xs text-muted">
          {totals.searches} {totals.searches === 1 ? 'search' : 'searches'} ·{' '}
          {totals.inTok.toLocaleString()} in / {totals.outTok.toLocaleString()} out ·
          ~${totals.usd < 0.01 ? totals.usd.toFixed(4) : totals.usd.toFixed(2)} (tokens; web search billed separately)
        </p>
      )}
    </div>
  )
}
