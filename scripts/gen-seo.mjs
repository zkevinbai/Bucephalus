/**
 * Post-build SEO generator. Runs after `vite build` and writes machine-readable
 * discovery files into dist/:
 *   - sitemap.xml  — every indexable URL, with blog lastmod dates
 *   - llms.txt     — a Markdown map of the site for AI / answer engines (GEO)
 *
 * Content is derived entirely from existing site data (blog posts, the toy
 * registry, route list) — it summarizes what's already on the site, it doesn't
 * author anything new.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const SITE = 'https://zkevinbai.com'

const isoDate = (human) => {
  const d = new Date(human)
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10)
}
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// --- Blog posts (plain-JS module, safe to import) ---------------------------
const { blogPosts } = await import(resolve(root, 'src/features/Blog/blogData.js'))

// --- Toys (toysData.js imports JSX components, so parse slugs/names from text)
const toysSrc = await readFile(resolve(root, 'src/features/Toys/toysData.js'), 'utf8')
const toys = []
const re = /slug:\s*'([^']+)',\s*\n\s*name:\s*'([^']+)',\s*\n\s*blurb:\s*'([^']*)'/g
let m
while ((m = re.exec(toysSrc))) {
  toys.push({ slug: m[1], name: m[2], blurb: m[3] })
}

// --- URL set ----------------------------------------------------------------
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/projects', priority: '0.6', changefreq: 'yearly' },
  { path: '/curiosities', priority: '0.4', changefreq: 'yearly' },
]
const toyUrls = toys.map((t) => ({
  path: t.slug === 'zodiac' ? '/apps/zodiac' : `/apps/${t.slug}`,
  priority: '0.6',
  changefreq: 'monthly',
}))
const toysIndex = [{ path: '/apps', priority: '0.7', changefreq: 'monthly' }]
const postUrls = blogPosts.map((p) => ({
  path: `/blog/${p.slug}`,
  priority: '0.7',
  changefreq: 'yearly',
  lastmod: isoDate(p.date),
}))

const urls = [...staticPages, ...toysIndex, ...toyUrls, ...postUrls]

// --- sitemap.xml ------------------------------------------------------------
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${SITE}${u.path}</loc>\n` +
        (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : '') +
        `    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`

await writeFile(resolve(dist, 'sitemap.xml'), sitemap)

// --- llms.txt (GEO) ---------------------------------------------------------
const llms =
  `# Kevin Bai\n\n` +
  `> Member of Technical Staff at Anthropic — Forward Deployed Engineering, Applied AI, ` +
  `and International Relations. Previously Palantir, the United Nations, Berkeley, and Oxford. ` +
  `Personal site at ${SITE}.\n\n` +
  `## Key pages\n\n` +
  `- [Home / about](${SITE}/): who Kevin is, career timeline, education, and skills.\n` +
  `- [Writing](${SITE}/blog): essays on forward deployed engineering, enterprise software, and geopolitics.\n` +
  `- [Apps](${SITE}/apps): small browser apps and AI experiments.\n` +
  `- [Projects](${SITE}/projects): selected work.\n\n` +
  `## Writing\n\n` +
  blogPosts
    .map((p) => `- [${p.title}](${SITE}/blog/${p.slug}): ${p.excerpt}`)
    .join('\n') +
  `\n\n## Apps\n\n` +
  toys.map((t) => `- [${t.name}](${SITE}${t.slug === 'zodiac' ? '/apps/zodiac' : `/apps/${t.slug}`}): ${t.blurb}`).join('\n') +
  `\n`

await writeFile(resolve(dist, 'llms.txt'), llms)

console.log(
  `[gen-seo] wrote sitemap.xml (${urls.length} urls) and llms.txt (${blogPosts.length} posts, ${toys.length} toys)`
)
