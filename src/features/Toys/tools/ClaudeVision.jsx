import { useEffect, useRef, useState } from 'react'
import { Field, TextArea, Btn, Note, SegmentedControl } from '../toykit'
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

const ACCEPTED = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const MAX_BYTES = 5 * 1024 * 1024 // Anthropic caps a single image at ~5MB.

const PROMPTS = [
  { label: 'Describe it', text: 'Describe this image in vivid detail.' },
  { label: 'Extract text (OCR)', text: 'Transcribe all text in this image exactly, preserving layout where you can.' },
  { label: 'Read the chart', text: 'Explain what this chart or diagram shows, including the key numbers and the takeaway.' },
  { label: 'Identify objects', text: 'List the notable objects, people, and places you can identify in this image.' },
  { label: 'Alt text', text: 'Write a concise, accessible alt-text description for this image (one sentence).' },
]

const DEFAULT_PROMPT = PROMPTS[0].text

// Estimate USD for a turn from the Messages API usage object (images bill as input tokens).
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

const prettyBytes = (n) => (n < 1024 * 1024 ? `${Math.round(n / 1024)} KB` : `${(n / 1048576).toFixed(1)} MB`)

function KeySetup({ initial, onSave }) {
  const [value, setValue] = useState(initial || '')
  return (
    <div className="rounded-2xl border border-line bg-white/60 p-5">
      <h3 className="font-serif text-lg font-semibold text-ink">Bring your own Anthropic key</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        This toy calls the Claude API directly from your browser, so it needs an API key. Paste one
        below — it’s stored only in this browser’s local storage and sent only to{' '}
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

function TypingDots() {
  return (
    <span className="inline-flex gap-1 text-muted" aria-label="Claude is typing">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
    </span>
  )
}

export default function ClaudeVision() {
  const [key, setKey] = useState(() => resolveKey())
  const [editingKey, setEditingKey] = useState(false)
  const [model, setModel] = useState('claude-haiku-4-5')
  const [image, setImage] = useState(null) // { dataUrl, base64, mediaType, name, size }
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT)
  const [dragOver, setDragOver] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [cost, setCost] = useState(null)

  const fileRef = useRef(null)
  const streamRef = useRef(null)

  const loadFile = (file, source = 'file') => {
    if (!file) return
    if (!ACCEPTED.includes(file.type)) {
      setError('Unsupported format. Use JPEG, PNG, GIF, or WebP.')
      return
    }
    if (file.size > MAX_BYTES) {
      setError(`That image is ${prettyBytes(file.size)} — the limit is 5 MB.`)
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result)
      const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1)
      setImage({ dataUrl, base64, mediaType: file.type, name: file.name, size: file.size })
      setAnswer('')
      setCost(null)
      setError('')
      trackEvent('app_use', { app_slug: 'claude-vision', app_action: 'add_image', source })
    }
    reader.readAsDataURL(file)
  }

  // Paste an image from the clipboard anywhere on the page.
  useEffect(() => {
    const onPaste = (e) => {
      const item = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith('image/'))
      if (item) loadFile(item.getAsFile(), 'paste')
    }
    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
  }, [])

  const saveKey = (k) => {
    setStoredKey(k)
    setKey(k || resolveKey())
    setEditingKey(false)
  }

  const stop = () => streamRef.current?.abort()

  const analyze = async () => {
    if (!image || streaming || !key) return
    setError('')
    setAnswer('')
    setCost(null)
    setStreaming(true)
    trackEvent('app_use', { app_slug: 'claude-vision', app_action: 'analyze', model })

    try {
      const client = makeClient(key)
      const stream = client.messages.stream({
        model,
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: image.mediaType, data: image.base64 },
              },
              { type: 'text', text: prompt.trim() || DEFAULT_PROMPT },
            ],
          },
        ],
      })
      streamRef.current = stream

      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          setAnswer((a) => a + event.delta.text)
        }
      }

      const final = await stream.finalMessage()
      if (final?.usage) setCost(costForTurn(final.usage, model))
    } catch (err) {
      const aborted = err?.name === 'AbortError' || /abort/i.test(err?.message || '')
      if (!aborted) setError(err?.message || 'API error.')
    } finally {
      streamRef.current = null
      setStreaming(false)
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
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white/50 p-4 sm:flex-row sm:items-end sm:justify-between">
        <Field label="Model">
          <SegmentedControl
            options={MODELS.map((m) => ({ value: m.id, label: m.label }))}
            value={model}
            onChange={setModel}
          />
        </Field>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="hidden sm:inline">key: {keySource}</span>
          <button onClick={() => setEditingKey((v) => !v)} className="font-medium hover:text-clay-deep">
            {editingKey ? 'Close' : 'Change key'}
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
        {/* Image side */}
        <div className="flex flex-col gap-3">
          <input
            ref={fileRef}
            type="file"
            accept={ACCEPTED.join(',')}
            className="hidden"
            onChange={(e) => loadFile(e.target.files?.[0])}
          />
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragOver(false)
              loadFile(e.dataTransfer.files?.[0], 'drop')
            }}
            className={`relative flex min-h-[18rem] items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed p-4 text-center transition-colors ${
              dragOver ? 'border-clay bg-clay/5' : 'border-line bg-cream/40'
            }`}
          >
            {image ? (
              <>
                <img
                  src={image.dataUrl}
                  alt={image.name}
                  className="max-h-[28rem] w-full rounded-lg object-contain"
                />
                <button
                  onClick={() => {
                    setImage(null)
                    setAnswer('')
                    setCost(null)
                  }}
                  className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-paper/90 text-muted shadow-sm transition-colors hover:text-clay-deep"
                  aria-label="Remove image"
                  title="Remove image"
                >
                  <i className="fas fa-times" aria-hidden />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 text-muted">
                <i className="fas fa-image text-3xl text-clay/70" aria-hidden />
                <p className="text-sm leading-relaxed">
                  Drag an image here, paste from your clipboard, or
                </p>
                <Btn variant="ghost" onClick={() => fileRef.current?.click()}>
                  <i className="far fa-folder-open" aria-hidden /> Choose a file
                </Btn>
                <p className="text-xs text-muted/80">JPEG, PNG, GIF, or WebP · up to 5 MB</p>
              </div>
            )}
          </div>
          {image && (
            <p className="truncate text-xs text-muted">
              {image.name} · {prettyBytes(image.size)} ·{' '}
              <button onClick={() => fileRef.current?.click()} className="font-medium hover:text-clay-deep">
                replace
              </button>
            </p>
          )}
        </div>

        {/* Prompt + answer side */}
        <div className="flex flex-col gap-4">
          <Field label="Ask about the image">
            <TextArea
              rows={3}
              mono={false}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What would you like to know about this image?"
            />
          </Field>

          <div className="flex flex-wrap gap-1.5">
            {PROMPTS.map((p) => (
              <button
                key={p.label}
                onClick={() => setPrompt(p.text)}
                className="rounded-md border border-line bg-white/60 px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-clay/60 hover:text-clay-deep"
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {streaming ? (
              <Btn variant="ghost" onClick={stop}>
                <i className="fas fa-stop" aria-hidden /> Stop
              </Btn>
            ) : (
              <Btn onClick={analyze} disabled={!image}>
                <i className="fas fa-eye" aria-hidden /> Analyze
              </Btn>
            )}
            {!image && <span className="text-xs text-muted">Add an image to start.</span>}
          </div>

          {error && <Note tone="error">{error}</Note>}

          {(answer || streaming) && (
            <div className="rounded-2xl border border-line bg-white/70 px-4 py-3 text-[0.95rem] leading-relaxed text-ink">
              {answer ? <p className="whitespace-pre-wrap">{answer}</p> : <TypingDots />}
            </div>
          )}

          {cost && (
            <p className="text-right text-xs text-muted">
              {cost.inTok.toLocaleString()} in / {cost.outTok.toLocaleString()} out · ~$
              {cost.usd < 0.01 ? cost.usd.toFixed(4) : cost.usd.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
