import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/* Renders Claude's markdown responses with the site's warm-editorial tokens.
   Used by the AI toys (lazy-loaded), so react-markdown ships only in those
   chunks. Colour and base font-size inherit from the caller's wrapper; each
   element just adds rhythm and emphasis. Streaming-safe — partial/half-open
   markdown (e.g. an unclosed code fence mid-stream) renders without throwing. */

// Inline `code` vs a fenced block: blocks carry a language- class or span lines.
function Code({ className, children, ...props }) {
  const text = String(children)
  const isBlock = /language-/.test(className || '') || text.includes('\n')
  if (isBlock) {
    return (
      <code className={`font-mono text-[0.85em] ${className || ''}`} {...props}>
        {children}
      </code>
    )
  }
  return (
    <code
      className="rounded bg-cream px-1 py-0.5 font-mono text-[0.85em] text-clay-deep"
      {...props}
    >
      {children}
    </code>
  )
}

const components = {
  p: (props) => <p className="my-2 first:mt-0 last:mb-0" {...props} />,
  a: (props) => (
    <a
      className="font-medium text-clay-deep underline underline-offset-2 hover:text-clay"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props) => <ul className="my-2 list-disc space-y-1 pl-5 first:mt-0 last:mb-0" {...props} />,
  ol: (props) => <ol className="my-2 list-decimal space-y-1 pl-5 first:mt-0 last:mb-0" {...props} />,
  li: (props) => <li className="leading-relaxed marker:text-muted" {...props} />,
  h1: (props) => <h1 className="mb-2 mt-3 font-serif text-lg font-semibold first:mt-0" {...props} />,
  h2: (props) => <h2 className="mb-2 mt-3 font-serif text-base font-semibold first:mt-0" {...props} />,
  h3: (props) => <h3 className="mb-1.5 mt-3 font-semibold first:mt-0" {...props} />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-2 border-l-2 border-line pl-3 italic text-muted first:mt-0 last:mb-0" {...props} />
  ),
  hr: () => <hr className="my-3 border-line" />,
  pre: (props) => (
    <pre
      className="my-2 overflow-x-auto rounded-lg border border-line bg-cream/70 p-3 text-[0.85em] leading-relaxed first:mt-0 last:mb-0"
      {...props}
    />
  ),
  code: Code,
  table: (props) => (
    <div className="my-2 overflow-x-auto first:mt-0 last:mb-0">
      <table className="w-full border-collapse text-[0.9em]" {...props} />
    </div>
  ),
  th: (props) => <th className="border border-line bg-cream/60 px-2 py-1 text-left font-semibold" {...props} />,
  td: (props) => <td className="border border-line px-2 py-1 align-top" {...props} />,
}

export default function Markdown({ children, className = '' }) {
  return (
    <div className={`break-words ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children || ''}
      </ReactMarkdown>
    </div>
  )
}
