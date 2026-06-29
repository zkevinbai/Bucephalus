import { useMemo, useState } from 'react'
import { Field, TextArea, Note } from '../toykit'

// Longest-common-subsequence line diff.
function diffLines(aText, bText, { ignoreWhitespace, ignoreCase }) {
  const a = aText.length ? aText.split('\n') : []
  const b = bText.length ? bText.split('\n') : []
  const norm = (s) => {
    let x = s
    if (ignoreWhitespace) x = x.trim().replace(/\s+/g, ' ')
    if (ignoreCase) x = x.toLowerCase()
    return x
  }
  const m = a.length
  const n = b.length
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] =
        norm(a[i]) === norm(b[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }
  const out = []
  let i = 0
  let j = 0
  while (i < m && j < n) {
    if (norm(a[i]) === norm(b[j])) {
      out.push({ type: 'same', text: a[i], left: i + 1, right: j + 1 })
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push({ type: 'del', text: a[i], left: i + 1 })
      i++
    } else {
      out.push({ type: 'add', text: b[j], right: j + 1 })
      j++
    }
  }
  while (i < m) out.push({ type: 'del', text: a[i], left: ++i })
  while (j < n) out.push({ type: 'add', text: b[j], right: ++j })
  return out
}

const ROW = {
  same: 'text-ink-soft',
  add: 'bg-sage/12 text-ink',
  del: 'bg-clay/12 text-ink',
}
const SIGN = { same: ' ', add: '+', del: '−' }
const SIGN_COLOR = { same: 'text-muted/50', add: 'text-sage', del: 'text-clay-deep' }

export default function TextDiff() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false)
  const [ignoreCase, setIgnoreCase] = useState(false)

  const rows = useMemo(
    () => diffLines(left, right, { ignoreWhitespace, ignoreCase }),
    [left, right, ignoreWhitespace, ignoreCase]
  )
  const added = rows.filter((r) => r.type === 'add').length
  const removed = rows.filter((r) => r.type === 'del').length
  const ready = left.length > 0 || right.length > 0

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Original">
          <TextArea rows={9} value={left} onChange={(e) => setLeft(e.target.value)} placeholder="Paste the first version…" />
        </Field>
        <Field label="Changed">
          <TextArea rows={9} value={right} onChange={(e) => setRight(e.target.value)} placeholder="Paste the second version…" />
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-5 text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-ink-soft">
          <input
            type="checkbox"
            checked={ignoreWhitespace}
            onChange={(e) => setIgnoreWhitespace(e.target.checked)}
            className="accent-clay"
          />
          Ignore whitespace
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-ink-soft">
          <input
            type="checkbox"
            checked={ignoreCase}
            onChange={(e) => setIgnoreCase(e.target.checked)}
            className="accent-clay"
          />
          Ignore case
        </label>
        {ready && (
          <span className="ml-auto flex items-center gap-3 font-medium">
            <span className="text-sage">+{added}</span>
            <span className="text-clay-deep">−{removed}</span>
          </span>
        )}
      </div>

      {ready ? (
        added === 0 && removed === 0 ? (
          <Note tone="ok">The two texts are identical.</Note>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-line bg-cream/40">
            <table className="w-full border-collapse font-mono text-[0.82rem]">
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={idx} className={ROW[r.type]}>
                    <td className="select-none border-r border-line/60 px-2 py-0.5 text-right text-[0.7rem] text-muted/60">
                      {r.left ?? ''}
                    </td>
                    <td className="select-none border-r border-line/60 px-2 py-0.5 text-right text-[0.7rem] text-muted/60">
                      {r.right ?? ''}
                    </td>
                    <td className={`select-none px-2 py-0.5 text-center ${SIGN_COLOR[r.type]}`}>
                      {SIGN[r.type]}
                    </td>
                    <td className="w-full whitespace-pre-wrap break-words py-0.5 pr-3 leading-relaxed">
                      {r.text || ' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <Note tone="muted">Paste two versions above to see what changed.</Note>
      )}
    </div>
  )
}
