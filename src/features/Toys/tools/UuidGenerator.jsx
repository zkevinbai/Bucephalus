import { useCallback, useEffect, useState } from 'react'
import { Field, Btn, CopyButton, TextInput, Output } from '../toykit'
import { trackToyUse } from '../../../utils/analytics'

function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID()
  // Fallback for older browsers.
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
}

export default function UuidGenerator() {
  const [count, setCount] = useState(5)
  const [ids, setIds] = useState([])

  const generate = useCallback(() => {
    const n = Math.max(1, Math.min(100, Number(count) || 1))
    setIds(Array.from({ length: n }, uuid))
  }, [count])

  // Seed an initial batch on mount.
  useEffect(() => {
    generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const joined = ids.join('\n')

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-3">
        <Field label="How many" className="w-28">
          <TextInput
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </Field>
        <Btn
          onClick={() => {
            trackToyUse('uuid', 'generate', { uuid_count: Number(count) || 1 })
            generate()
          }}
        >
          <i className="fas fa-dice" aria-hidden /> Generate
        </Btn>
        <CopyButton value={joined} label="Copy all" className="ml-auto" />
      </div>

      <Field label="UUID v4">
        <Output value={joined} empty="Click Generate." />
      </Field>
    </div>
  )
}
