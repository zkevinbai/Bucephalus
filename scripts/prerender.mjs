/**
 * Build-time prerendering for content routes. Runs after the client build, the
 * SSR build, and gen-seo. For each high-value route it server-renders the app to
 * HTML and writes a static dist/<route>/index.html with the content baked in plus
 * route-specific <head> metadata + JSON-LD — so crawlers that don't run JS (some
 * AI/answer engines) and first paint both get real content.
 *
 * Every route is best-effort: a failure logs and is skipped, leaving the normal
 * SPA fallback for that route. The build never fails because of prerendering.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const SITE = 'https://zkevinbai.com'

const escAttr = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escText = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const { render } = await import(resolve(root, 'dist-server/entry-server.js'))
const { blogPosts } = await import(resolve(root, 'src/features/Blog/blogData.js'))
const { articleJsonLd, blogJsonLd } = await import(resolve(root, 'src/utils/seo.js'))

const template = await readFile(resolve(dist, 'index.html'), 'utf8')

const BLOG_DESC =
  'Thoughts on forward deployed engineering, enterprise software, international geopolitics and economics, and building technology that solves real problems.'

const routes = [
  {
    path: '/',
    title: 'Kevin Bai — Member of Technical Staff, Anthropic',
    desc: 'Forward Deployed Engineering, Applied AI, and International Relations. Previously Palantir, the United Nations, Berkeley, and Oxford.',
    type: 'profile',
  },
  { path: '/blog', title: 'Writing — Kevin Bai', desc: BLOG_DESC, jsonLd: blogJsonLd(blogPosts) },
  ...blogPosts.map((p) => ({
    path: `/blog/${p.slug}`,
    title: `${p.title} — Kevin Bai`,
    desc: p.excerpt,
    type: 'article',
    jsonLd: articleJsonLd(p),
  })),
  { path: '/projects', title: 'Projects — Kevin Bai', desc: 'Selected projects and things Kevin Bai has built.' },
  { path: '/curiosities', title: 'Curiosities — Kevin Bai', desc: 'Off-the-main-path corners of zkevinbai.com.' },
]

function injectHead(html, r) {
  const url = SITE + r.path
  const sub = (re, value) => {
    html = html.replace(re, value)
  }
  sub(/<title>[\s\S]*?<\/title>/, `<title>${escText(r.title)}</title>`)
  sub(/(<meta name="description" content=")[^"]*(")/, `$1${escAttr(r.desc)}$2`)
  sub(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  sub(/(<meta property="og:title" content=")[^"]*(")/, `$1${escAttr(r.title)}$2`)
  sub(/(<meta property="og:description" content=")[^"]*(")/, `$1${escAttr(r.desc)}$2`)
  sub(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
  sub(/(<meta property="og:type" content=")[^"]*(")/, `$1${r.type || 'website'}$2`)
  sub(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escAttr(r.title)}$2`)
  sub(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escAttr(r.desc)}$2`)
  sub(/(<meta name="twitter:url" content=")[^"]*(")/, `$1${url}$2`)
  if (r.jsonLd) {
    html = html.replace(
      '</head>',
      `  <script type="application/ld+json">${JSON.stringify(r.jsonLd)}</script>\n  </head>`
    )
  }
  return html
}

let ok = 0
let skipped = 0
for (const r of routes) {
  try {
    const appHtml = render(r.path)
    if (!appHtml || !appHtml.trim()) throw new Error('empty render')
    let page = injectHead(template, r)
    page = page.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    const outDir = r.path === '/' ? dist : resolve(dist, '.' + r.path)
    await mkdir(outDir, { recursive: true })
    await writeFile(resolve(outDir, 'index.html'), page)
    ok++
  } catch (err) {
    skipped++
    console.warn(`[prerender] skipped ${r.path}: ${err.message}`)
  }
}

console.log(`[prerender] prerendered ${ok} routes${skipped ? `, skipped ${skipped}` : ''}`)
