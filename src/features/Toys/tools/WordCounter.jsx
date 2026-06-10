import { useMemo, useState } from 'react'
import { Field, TextArea, Stat } from '../toykit'

export default function WordCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const trimmed = text.trim()
    const words = trimmed ? trimmed.split(/\s+/).length : 0
    const chars = text.length
    const charsNoSpaces = text.replace(/\s/g, '').length
    const sentences = trimmed ? (trimmed.match(/[^.!?]+[.!?]+/g)?.length ?? 1) : 0
    const paragraphs = trimmed ? trimmed.split(/\n{2,}/).filter((p) => p.trim()).length : 0
    const lines = text === '' ? 0 : text.split('\n').length
    // Average adult reads ~225 wpm.
    const readMins = words / 225
    const readTime =
      words === 0 ? '0 sec' : readMins < 1 ? `${Math.ceil(readMins * 60)} sec` : `${Math.ceil(readMins)} min`
    return { words, chars, charsNoSpaces, sentences, paragraphs, lines, readTime }
  }, [text])

  return (
    <div className="flex flex-col gap-6">
      <Field label="Your text">
        <TextArea
          mono={false}
          rows={12}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type here…"
        />
      </Field>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
        <Stat label="Words" value={stats.words.toLocaleString()} />
        <Stat label="Characters" value={stats.chars.toLocaleString()} />
        <Stat label="No spaces" value={stats.charsNoSpaces.toLocaleString()} />
        <Stat label="Sentences" value={stats.sentences.toLocaleString()} />
        <Stat label="Paragraphs" value={stats.paragraphs.toLocaleString()} />
        <Stat label="Lines" value={stats.lines.toLocaleString()} />
        <Stat label="Read time" value={stats.readTime} />
      </div>
    </div>
  )
}
