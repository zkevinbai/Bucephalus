import { useState } from 'react'
import { Field, TextArea, Btn, CopyButton, Note, SegmentedControl } from '../toykit'

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
    <div className="flex flex-col gap-6">
      <Field label="JSON input" hint="Paste raw or minified JSON">
        <TextArea
          rows={10}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"hello": "world"}'
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

      {output && (
        <Field label="Result">
          <div className="relative">
            <TextArea readOnly rows={12} value={output} className="bg-cream/50" />
            <CopyButton value={output} className="absolute right-3 top-3" />
          </div>
        </Field>
      )}
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
