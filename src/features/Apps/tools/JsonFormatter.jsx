import { useState } from 'react'
import { Field, TextArea, Btn, CopyButton, Note, SegmentedControl } from '../toykit'
import { trackToyUse } from '../../../utils/analytics'

const SAMPLE = '{"name":"Kevin","roles":["FDE","speaker"],"languages":6,"active":true}'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState('2')

  const run = (mode) => {
    setError('')
    if (!input.trim()) {
      setOutput('')
      return
    }
    trackToyUse('json-formatter', mode)
    try {
      const parsed = JSON.parse(input)
      const space = mode === 'minify' ? 0 : indent === 'tab' ? '\t' : Number(indent)
      setOutput(JSON.stringify(parsed, null, space))
    } catch (e) {
      setOutput('')
      setError(formatError(e.message, input))
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="flex flex-col gap-6">
        <Field label="JSON input" hint="Paste raw or minified JSON">
          <TextArea
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"hello": "world"}'
            className="lg:min-h-[20rem]"
          />
        </Field>

        <div className="flex flex-wrap items-center gap-3">
          <Btn onClick={() => run('pretty')}>
            <i className="fas fa-align-left" aria-hidden /> Format
          </Btn>
          <Btn variant="ghost" onClick={() => run('minify')}>
            <i className="fas fa-compress" aria-hidden /> Minify
          </Btn>
          <SegmentedControl
            options={[
              { value: '2', label: '2 spaces' },
              { value: '4', label: '4 spaces' },
              { value: 'tab', label: 'Tab' },
            ]}
            value={indent}
            onChange={setIndent}
          />
          <Btn
            variant="ghost"
            className="ml-auto"
            onClick={() => {
              setInput(SAMPLE)
              setOutput('')
              setError('')
            }}
          >
            Try a sample
          </Btn>
        </div>

        <Note tone="error">{error}</Note>
      </div>

      {/* Sits beside the input on desktop; on mobile it only appears once there's a result. */}
      <Field label="Result" className={output ? '' : 'hidden lg:flex'}>
        <div className="relative">
          <TextArea
            readOnly
            rows={12}
            value={output}
            placeholder="Formatted JSON appears here."
            className="bg-cream/50 lg:min-h-[26rem]"
          />
          {output && <CopyButton value={output} className="absolute right-3 top-3" />}
        </div>
      </Field>
    </div>
  )
}

// Surface the character position from a JSON parse error as line:col when possible.
function formatError(message, source) {
  const posMatch = message.match(/position (\d+)/)
  if (posMatch) {
    const pos = Number(posMatch[1])
    const upto = source.slice(0, pos)
    const line = upto.split('\n').length
    const col = pos - upto.lastIndexOf('\n')
    return `${message.replace(/in JSON.*/, '').trim()} — line ${line}, column ${col}`
  }
  return message
}
