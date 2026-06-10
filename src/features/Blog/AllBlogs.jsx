import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import { blogPosts } from './blogData'
import { trackBlogPostClick } from '../../utils/analytics'

export default function AllBlogs() {
  return (
    <Container size="reading" className="pt-32 pb-8 md:pt-40">
      <header className="reveal">
        <p className="eyebrow">Writing</p>
        <h1 className="mt-4 font-serif text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink md:text-6xl">
          Notes from the field.
        </h1>
        <p className="mt-5 text-[1.1rem] leading-relaxed text-muted">
          Thoughts on forward deployed engineering, enterprise software, international geopolitics
          and economics, and building technology that solves real problems.
        </p>
      </header>

      <div className="mt-14 flex flex-col">
        {blogPosts.map((post, index) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            onClick={() =>
              trackBlogPostClick({ slug: post.slug, title: post.title, category: post.category })
            }
            className="reveal group block border-t border-line py-7 last:border-b"
          >
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-clay-deep">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </div>

            <h2 className="mt-3 font-serif text-[1.55rem] font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-clay-deep md:text-[1.75rem]">
              {post.title}
            </h2>

            <p className="mt-2.5 text-[1rem] leading-relaxed text-ink-soft">{post.excerpt}</p>

            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-deep">
              Read
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </Container>
  )
}
