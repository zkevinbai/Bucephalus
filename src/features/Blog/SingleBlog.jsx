import { useParams, Link } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import Container from '../../components/Container'
import { getPostBySlug, blogPosts } from './blogData'
import { trackBlogPostView } from '../../utils/analytics'

// The blog content carries legacy inline class attributes (font-raleway, gray
// utilities, etc.). Strip them so the `.prose` layer styles it by tag instead.
function stripInlineClasses(html) {
  return html.replace(/\sclass="[^"]*"/g, '')
}

export default function SingleBlog() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  const cleanContent = useMemo(
    () => (post ? stripInlineClasses(post.content) : ''),
    [post]
  )

  // Adjacent posts for prev/next navigation.
  const index = blogPosts.findIndex((p) => p.slug === slug)
  const prev = index > 0 ? blogPosts[index - 1] : null
  const next = index >= 0 && index < blogPosts.length - 1 ? blogPosts[index + 1] : null

  useEffect(() => {
    if (post) trackBlogPostView({ slug, title: post.title, category: post.category })
  }, [slug, post])

  if (!post) {
    return (
      <Container size="reading" className="pt-40 pb-20 text-center">
        <h1 className="font-serif text-3xl font-semibold text-ink">Post not found</h1>
        <Link to="/blog" className="mt-6 inline-block font-medium text-clay-deep hover:text-clay">
          ← Back to writing
        </Link>
      </Container>
    )
  }

  return (
    <Container size="reading" className="pt-28 pb-8 md:pt-36">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-clay-deep"
      >
        <span aria-hidden>←</span> Writing
      </Link>

      <header className="mt-8 border-b border-line pb-8">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-clay-deep">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span aria-hidden>·</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="mt-4 font-serif text-[2.3rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink md:text-[3.1rem]">
          {post.title}
        </h1>
        {post.author && (
          <p className="mt-4 text-[0.95rem] text-muted">By {post.author}</p>
        )}
      </header>

      <article
        className="prose mt-10"
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />

      <nav className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link
            to={`/blog/${prev.slug}`}
            className="group rounded-xl border border-line bg-white/60 p-5 transition-colors hover:border-clay/60"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              ← Previous
            </span>
            <p className="mt-1.5 font-serif text-base font-semibold text-ink group-hover:text-clay-deep">
              {prev.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/blog/${next.slug}`}
            className="group rounded-xl border border-line bg-white/60 p-5 text-right transition-colors hover:border-clay/60 sm:col-start-2"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Next →
            </span>
            <p className="mt-1.5 font-serif text-base font-semibold text-ink group-hover:text-clay-deep">
              {next.title}
            </p>
          </Link>
        )}
      </nav>
    </Container>
  )
}
