import { useState } from 'react'
import { Field, TextArea, Btn, CopyButton, Note, SegmentedControl } from '../toykit'

const DIALECTS = [
  { value: 'sql', label: 'Standard' },
  { value: 'postgresql', label: 'Postgres' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'bigquery', label: 'BigQuery' },
  { value: 'spark', label: 'Spark' },
]

const SAMPLE =
  "select u.id, u.name, count(o.id) as orders, sum(o.total) as revenue from users u left join orders o on o.user_id = u.id where u.created_at >= '2026-01-01' and u.status in ('active','trial') group by u.id, u.name having count(o.id) > 0 order by revenue desc limit 25"

// sql-formatter is lazy-loaded on first use so the rest of the site never pays for it.
let formatterPromise = null
const loadFormatter = () => (formatterPromise ??= import('sql-formatter'))

export default function SqlFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [dialect, setDialect] = useState('postgresql')
  const [keywordCase, setKeywordCase] = useState('upper')
  const [busy, setBusy] = useState(false)

  const run = async () => {
    setError('')
    if (!input.trim()) {
      setOutput('')
      return
    }
    setBusy(true)
    try {
      const { format } = await loadFormatter()
      setOutput(
        format(input, {
          language: dialect,
          keywordCase,
          tabWidth: 2,
          linesBetweenQueries: 2,
        })
      )
    } catch (e) {
      setOutput('')
      setError(e.message.split('\n')[0])
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Field label="SQL input" hint="any messy query">
        <TextArea
          rows={9}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="select * from users where …"
        />
      </Field>

      <div className="flex flex-wrap items-center gap-3">
        <Btn onClick={run} disabled={busy}>
          <i className="fas fa-align-left" aria-hidden /> {busy ? 'Formatting…' : 'Format'}
        </Btn>
        <SegmentedControl options={DIALECTS} value={dialect} onChange={setDialect} />
        <SegmentedControl
          options={[
            { value: 'upper', label: 'KEYWORDS' },
            { value: 'lower', label: 'keywords' },
          ]}
          value={keywordCase}
          onChange={setKeywordCase}
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
            <TextArea readOnly rows={16} value={output} className="bg-cream/50" />
            <CopyButton value={output} className="absolute right-3 top-3" />
          </div>
        </Field>
      )}
    </div>
  )
}
