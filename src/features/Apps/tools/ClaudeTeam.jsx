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

/* A managed multi-agent toy: a lead agent coordinates specialist subagents by
   calling a client-side `delegate` tool. Each subagent is its own Claude
   conversation (the researcher gets server-side web search), run live in the
   browser. There is no backend — "delegation" is just another API call whose
   result we feed back to the lead as a tool_result. */

const WEB_SEARCH = { type: 'web_search_20250305', name: 'web_search', max_uses: 4 }

// The specialists the lead can hand work to. Each is stateless and only ever
// sees the task string the lead writes for it.
const SUBAGENTS = {
  researcher: {
    label: 'Researcher',
    icon: 'fas fa-search',
    dot: 'bg-ocean',
    text: 'text-ocean',
    tools: [WEB_SEARCH],
    system:
      'You are a research specialist on an agent team. Use the web_search tool to gather current, accurate information for the task you are handed — search more than once when it has several parts. Report concise, well-organized findings grounded in what you found, and cite source URLs inline. Do not editorialize or pad.',
  },
  writer: {
    label: 'Writer',
    icon: 'fas fa-feather',
    dot: 'bg-clay',
    text: 'text-clay-deep',
    system:
      'You are a writing specialist on an agent team. Turn the brief you are handed into clear, well-structured prose. Match the requested tone and length, lead with the point, and cut filler. Return only the writing, no preamble.',
  },
  critic: {
    label: 'Critic',
    icon: 'fas fa-balance-scale',
    dot: 'bg-plum',
    text: 'text-plum',
    system:
      'You are a critical reviewer on an agent team. Scrutinize the material you are handed for weaknesses, gaps, unsupported claims, and errors. Give specific, actionable feedback as a short prioritized list. Be direct; do not flatter.',
  },
}

const DELEGATE_TOOL = {
  name: 'delegate',
  description:
    'Assign one focused subtask to a specialist subagent and get its result back. You may call this several times in a single turn to fan work out in parallel. Each subagent is stateless and sees ONLY the task text you provide, so make every task fully self-contained. Do the final synthesis yourself rather than delegating it.',
  input_schema: {
    type: 'object',
    properties: {
      agent: {
        type: 'string',
        enum: ['researcher', 'writer', 'critic'],
        description: 'Which specialist to use: researcher (live web search), writer (drafts prose), or critic (reviews and finds gaps).',
      },
      task: {
        type: 'string',
        description: 'A complete, standalone instruction for the subagent, including any context it needs.',
      },
    },
    required: ['agent', 'task'],
  },
}

const LEAD_SYSTEM =
  'You are the lead of a small agent team. You coordinate three specialists through the `delegate` tool: a Researcher (runs live web searches), a Writer (drafts prose), and a Critic (reviews work and finds gaps). ' +
  'Briefly plan your approach in a sentence or two, then delegate focused subtasks. Each subagent is stateless and sees ONLY the task text you give it — never any other subagent’s output unless you paste it in. ' +
  'So mind dependencies: fan out several delegations in one turn ONLY when they are truly independent. When one task depends on another (e.g. the critic reviewing the writer’s draft, or the writer using the researcher’s findings), delegate it in a LATER turn and paste the prior result verbatim into its task. Never ask a subagent to review or use work it has not been given. ' +
  'Do not do the research or heavy writing yourself; that is what the team is for. When you have what you need, write the final answer yourself, synthesizing and reconciling the subagents’ work into one coherent response. Write it as plain prose — no Markdown headings, bold, or bullet syntax, since it is shown as plain text.'

const LEAD_MAX_TURNS = 8 // bound the delegate/synthesis loop
const SUB_MAX_TURNS = 6 // bound a subagent's own pause_turn continuation

function costFor(usage, model) {
  const { inPrice, outPrice } = modelFor(model)
  const input =
    (usage.input_tokens || 0) +
    (usage.cache_read_input_tokens || 0) +
    (usage.cache_creation_input_tokens || 0)
  const output = usage.output_tokens || 0
  return { inTok: input, outTok: output, usd: (input * inPrice + output * outPrice) / 1e6 }
}

function KeySetup({ initial, onSave }) {
  const [value, setValue] = useState(initial || '')
  return (
    <div className="rounded-2xl border border-line bg-white/60 p-5">
      <h3 className="font-serif text-lg font-semibold text-ink">Bring your own Anthropic key</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        The team calls the Claude API directly from your browser, so it needs an API key. It’s
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
        . Note: a run makes several model calls (one per subagent), and web search is a billed
        server tool.
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

function DelegationCard({ event }) {
  const def = SUBAGENTS[event.agent] || {}
  const running = event.status === 'running'
  return (
    <div className="rounded-xl border border-line bg-white/70">
      <div className="flex items-center gap-2.5 border-b border-line/70 px-4 py-2.5">
        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${def.dot || 'bg-muted'}`}>
          <i className={`${def.icon || 'fas fa-robot'} text-[0.7rem]`} aria-hidden />
        </span>
        <span className={`font-serif text-sm font-semibold ${def.text || 'text-ink'}`}>
          {def.label || event.agent}
        </span>
        {event.searches > 0 && (
          <span className="text-xs text-muted">
            · {event.searches} {event.searches === 1 ? 'search' : 'searches'}
          </span>
        )}
        <span className="ml-auto text-xs text-muted">
          {running ? (
            <>
              <i className="fas fa-circle-notch fa-spin mr-1 text-ocean" aria-hidden /> working…
            </>
          ) : (
            <>
              <i className="fas fa-check mr-1 text-sage" aria-hidden /> done
            </>
          )}
        </span>
      </div>
      <div className="px-4 py-3">
        <p className="mb-2 text-[0.8rem] italic leading-snug text-muted">“{event.task}”</p>
        {event.output ? (
          <Markdown className="text-[0.9rem] leading-relaxed text-ink">{event.output}</Markdown>
        ) : (
          <p className="text-sm text-muted">…</p>
        )}
      </div>
    </div>
  )
}

export default function ClaudeTeam() {
  const [key, setKey] = useState(() => resolveKey())
  const [editingKey, setEditingKey] = useState(false)
  const [model, setModel] = useState('claude-haiku-4-5')
  const [thinking, setThinking] = useState(false)
  const [goal, setGoal] = useState('')
  const [running, setRunning] = useState(false)
  const [error, setError] = useState('')

  // Ordered timeline of everything that happened, lead + subagents interleaved.
  // Event kinds: 'lead-think' | 'lead-text' | 'delegation'
  const [events, setEvents] = useState([])
  const [totals, setTotals] = useState({ inTok: 0, outTok: 0, usd: 0, calls: 0, searches: 0 })

  const streamsRef = useRef(new Set()) // every in-flight stream, so Stop aborts them all
  const traceRef = useRef(null)

  useEffect(() => {
    const el = traceRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [events, running])

  const saveKey = (k) => {
    setStoredKey(k)
    setKey(k || resolveKey())
    setEditingKey(false)
  }

  const track = (stream) => {
    streamsRef.current.add(stream)
    return stream
  }
  const stop = () => {
    for (const s of streamsRef.current) {
      try {
        s.abort()
      } catch {
        /* already settled */
      }
    }
    streamsRef.current.clear()
  }

  const addUsage = (usage) => {
    if (!usage) return
    const c = costFor(usage, model)
    setTotals((t) => ({
      ...t,
      inTok: t.inTok + c.inTok,
      outTok: t.outTok + c.outTok,
      usd: t.usd + c.usd,
      calls: t.calls + 1,
    }))
  }

  const updateEvent = (id, patch) =>
    setEvents((evs) => evs.map((e) => (e.id === id ? { ...e, ...patch } : e)))

  // Run one specialist on a task, streaming its output into its card.
  const runSubagent = async (client, agentKey, task, eventId) => {
    const def = SUBAGENTS[agentKey]
    if (!def) return `Unknown subagent: ${agentKey}`
    const messages = [{ role: 'user', content: task }]
    let out = ''
    let turns = 0

    while (turns++ < SUB_MAX_TURNS) {
      const stream = track(
        client.messages.stream({
          model,
          max_tokens: 4096,
          system: def.system,
          ...(def.tools ? { tools: def.tools } : {}),
          messages,
        })
      )
      const blocks = {}
      try {
        for await (const ev of stream) {
          if (ev.type === 'content_block_start') {
            blocks[ev.index] = { type: ev.content_block.type, name: ev.content_block.name, json: '' }
          } else if (ev.type === 'content_block_delta') {
            if (ev.delta.type === 'text_delta') {
              out += ev.delta.text
              updateEvent(eventId, { output: out })
            } else if (ev.delta.type === 'input_json_delta') {
              const b = blocks[ev.index]
              if (b) b.json += ev.delta.partial_json
            }
          } else if (ev.type === 'content_block_stop') {
            const b = blocks[ev.index]
            if (b?.type === 'server_tool_use' && b.name === 'web_search') {
              setTotals((t) => ({ ...t, searches: t.searches + 1 }))
              setEvents((evs) =>
                evs.map((e) => (e.id === eventId ? { ...e, searches: (e.searches || 0) + 1 } : e))
              )
            }
          }
        }
      } finally {
        streamsRef.current.delete(stream)
      }

      const final = await stream.finalMessage()
      addUsage(final?.usage)
      messages.push({ role: 'assistant', content: final.content })
      if (final.stop_reason !== 'pause_turn') break
    }
    return out || '(no output)'
  }

  const run = async () => {
    const task = goal.trim()
    if (!task || running || !key) return

    setError('')
    setEvents([])
    setTotals({ inTok: 0, outTok: 0, usd: 0, calls: 0, searches: 0 })
    setRunning(true)
    trackEvent('toy_use', { toy_slug: 'agent-team', toy_action: 'run', model })

    const client = makeClient(key)
    const messages = [{ role: 'user', content: task }]
    let turn = 0

    try {
      while (turn++ < LEAD_MAX_TURNS) {
        const stream = track(
          client.messages.stream({
            model,
            max_tokens: 4096,
            system: LEAD_SYSTEM,
            tools: [DELEGATE_TOOL],
            ...(thinking ? { thinking: { type: 'adaptive', display: 'summarized' } } : {}),
            messages,
          })
        )

        const blocks = {} // index -> { eventId, type, name, json }
        const pending = [] // delegate calls collected this turn
        const textIds = [] // lead-text event ids created this turn

        try {
          for await (const ev of stream) {
            if (ev.type === 'content_block_start') {
              const b = ev.content_block
              if (b.type === 'text') {
                const id = `t${turn}-${ev.index}`
                blocks[ev.index] = { eventId: id, type: b.type }
                textIds.push(id)
                setEvents((evs) => [...evs, { id, kind: 'lead-text', text: '', final: false }])
              } else if (b.type === 'thinking') {
                const id = `k${turn}-${ev.index}`
                blocks[ev.index] = { eventId: id, type: b.type }
                setEvents((evs) => [...evs, { id, kind: 'lead-think', text: '' }])
              } else if (b.type === 'tool_use' && b.name === 'delegate') {
                blocks[ev.index] = { eventId: b.id, type: b.type, name: b.name, json: '' }
                setEvents((evs) => [
                  ...evs,
                  { id: b.id, kind: 'delegation', agent: '', task: '', output: '', searches: 0, status: 'running' },
                ])
              } else {
                blocks[ev.index] = { type: b.type, name: b.name, json: '' }
              }
            } else if (ev.type === 'content_block_delta') {
              const b = blocks[ev.index]
              if (ev.delta.type === 'text_delta' && b?.eventId) {
                setEvents((evs) =>
                  evs.map((e) => (e.id === b.eventId ? { ...e, text: e.text + ev.delta.text } : e))
                )
              } else if (ev.delta.type === 'thinking_delta' && b?.eventId) {
                setEvents((evs) =>
                  evs.map((e) => (e.id === b.eventId ? { ...e, text: e.text + ev.delta.thinking } : e))
                )
              } else if (ev.delta.type === 'input_json_delta' && b) {
                b.json += ev.delta.partial_json
              }
            } else if (ev.type === 'content_block_stop') {
              const b = blocks[ev.index]
              if (b?.type === 'tool_use' && b.name === 'delegate') {
                try {
                  const input = JSON.parse(b.json)
                  const agent = SUBAGENTS[input.agent] ? input.agent : 'researcher'
                  updateEvent(b.eventId, { agent, task: input.task || '' })
                  pending.push({ id: b.eventId, agent, task: input.task || '' })
                } catch {
                  /* partial JSON — skip */
                }
              }
            }
          }
        } finally {
          streamsRef.current.delete(stream)
        }

        const final = await stream.finalMessage()
        addUsage(final?.usage)
        messages.push({ role: 'assistant', content: final.content })

        if (final.stop_reason === 'tool_use' && pending.length) {
          // Fan the delegations out in parallel; each streams into its own card.
          const results = await Promise.all(
            pending.map((p) =>
              runSubagent(client, p.agent, p.task, p.id).then((output) => {
                updateEvent(p.id, { output, status: 'done' })
                return { type: 'tool_result', tool_use_id: p.id, content: output }
              })
            )
          )
          messages.push({ role: 'user', content: results })
          continue
        }

        // Terminal turn — its text blocks are the lead's synthesized answer.
        textIds.forEach((id) => updateEvent(id, { final: true }))
        break
      }
    } catch (err) {
      const aborted = err?.name === 'AbortError' || /abort/i.test(err?.message || '')
      if (!aborted) setError(err?.message || 'Something went wrong running the team.')
    } finally {
      stop()
      setRunning(false)
    }
  }

  if (!key && !editingKey) {
    return <KeySetup initial={getStoredKey()} onSave={saveKey} />
  }

  const keySource = getStoredKey() ? 'your saved key' : hasEnvKey() ? '.env.local' : 'none'
  const idle = !running && events.length === 0

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
            Lead thinking
          </label>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="hidden sm:inline">key: {keySource}</span>
          <button onClick={() => setEditingKey((v) => !v)} className="font-medium hover:text-clay-deep">
            {editingKey ? 'Close' : 'Change key'}
          </button>
        </div>
      </div>

      {/* Team roster */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
        <span className="font-medium uppercase tracking-[0.16em] text-clay">Team</span>
        {Object.values(SUBAGENTS).map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/60 px-2.5 py-1">
            <span className={`h-2 w-2 rounded-full ${s.dot}`} />
            {s.label}
          </span>
        ))}
      </div>

      {/* The loop runs here in the browser via the Messages API. Anthropic's
          Managed Agents product runs the loop server-side only, so a static,
          backend-less site like this can't call it directly. */}
      <p className="-mt-1 text-xs leading-relaxed text-muted">
        <i className="fas fa-info-circle mr-1 text-clay/70" aria-hidden />
        This runs the multi-agent loop right here in your browser with the Claude{' '}
        <a
          href="https://platform.claude.com/docs/en/build-with-claude/working-with-messages"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-clay-deep underline-offset-2 hover:underline"
        >
          Messages API
        </a>
        . Anthropic’s{' '}
        <a
          href="https://platform.claude.com/docs/en/managed-agents/overview"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-clay-deep underline-offset-2 hover:underline"
        >
          Managed Agents
        </a>{' '}
        — where the agent loop runs on Anthropic’s own infrastructure — is server-side only (no
        browser access), so a static site like this can’t call it directly.
      </p>

      {/* Goal */}
      <Field label="Goal for the team" hint="Enter to run, Shift+Enter for newline">
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
            placeholder="e.g. Draft a short, well-sourced brief on the state of solid-state batteries in 2026."
            className="flex-1"
          />
          {running ? (
            <Btn variant="ghost" onClick={stop} className="shrink-0">
              <i className="fas fa-stop" aria-hidden /> Stop
            </Btn>
          ) : (
            <Btn onClick={run} disabled={!goal.trim()} className="shrink-0">
              <i className="fas fa-wand-magic-sparkles" aria-hidden /> Run team
            </Btn>
          )}
        </div>
      </Field>

      {error && <Note tone="error">{error}</Note>}

      {/* Timeline */}
      {!idle && (
        <div
          ref={traceRef}
          className="flex max-h-[64vh] flex-col gap-3 overflow-y-auto rounded-2xl border border-line bg-cream/40 p-4"
        >
          {events.map((e) => {
            if (e.kind === 'delegation') return <DelegationCard key={e.id} event={e} />
            if (e.kind === 'lead-think') {
              return (
                <details key={e.id} className="rounded-xl border border-line bg-white/40 px-3.5 py-2.5 text-[0.85rem]">
                  <summary className="cursor-pointer font-medium text-muted">Lead thinking</summary>
                  <p className="mt-1 whitespace-pre-wrap italic text-muted">{e.text}</p>
                </details>
              )
            }
            // lead-text
            if (!e.text) return null
            return e.final ? (
              <div key={e.id} className="rounded-2xl border border-line bg-white/80 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-clay">
                  <i className="fas fa-user-tie mr-1.5" aria-hidden /> Lead — final answer
                </p>
                <Markdown className="text-[0.95rem] leading-relaxed text-ink">{e.text}</Markdown>
              </div>
            ) : (
              <div key={e.id} className="flex gap-2.5 px-1">
                <i className="fas fa-user-tie mt-1 text-sm text-clay" aria-hidden />
                <Markdown className="text-[0.92rem] leading-relaxed text-ink-soft">{e.text}</Markdown>
              </div>
            )
          })}
          {running && (
            <div className="flex items-center gap-2 px-1 text-sm text-muted">
              <i className="fas fa-circle-notch fa-spin text-clay" aria-hidden /> Lead coordinating…
            </div>
          )}
        </div>
      )}

      {idle && (
        <div className="rounded-2xl border border-dashed border-line bg-cream/30 p-6 text-center text-sm text-muted">
          Give the team a goal. A lead agent plans, delegates focused subtasks to the researcher,
          writer, and critic, then synthesizes their work into one answer — watch each subagent run
          live, with the whole orchestration loop running right here in your browser.
        </div>
      )}

      {/* Usage */}
      {(totals.outTok > 0 || totals.calls > 0) && (
        <p className="text-right text-xs text-muted">
          {totals.calls} model {totals.calls === 1 ? 'call' : 'calls'}
          {totals.searches > 0 && <> · {totals.searches} {totals.searches === 1 ? 'search' : 'searches'}</>} ·{' '}
          {totals.inTok.toLocaleString()} in / {totals.outTok.toLocaleString()} out · ~$
          {totals.usd < 0.01 ? totals.usd.toFixed(4) : totals.usd.toFixed(2)} (tokens; web search billed separately)
        </p>
      )}
    </div>
  )
}
