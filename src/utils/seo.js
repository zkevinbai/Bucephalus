/**
 * Dependency-free per-route head management for the SPA.
 *
 * `useSeo` updates the document <title>, description, canonical link, Open Graph
 * and Twitter tags, an optional <meta robots>, and an optional per-route
 * JSON-LD block as the user navigates. This makes each route present correct
 * metadata to JS-rendering crawlers (Google) and to anything that reads the DOM
 * after hydration, on top of the static tags in index.html.
 *
 * Note: pure-HTML crawlers that don't run JS (some AI bots) see the static
 * index.html head only — the homepage's Person/WebSite JSON-LD lives there.
 */
import { useEffect } from 'react'

export const SITE_URL = 'https://zkevinbai.com'
export const SITE_NAME = 'Kevin Bai'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg?v=2`

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (content == null) {
    return
  }
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

const ROUTE_JSONLD_ID = 'route-jsonld'
function setRouteJsonLd(obj) {
  let el = document.getElementById(ROUTE_JSONLD_ID)
  if (!obj) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = ROUTE_JSONLD_ID
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(obj)
}

/** Convert a human date like "8 June 2026" to an ISO date "2026-06-08". */
export function isoDate(human) {
  const d = new Date(human)
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10)
}

export function useSeo({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  robots,
  jsonLd,
} = {}) {
  const ld = jsonLd ? JSON.stringify(jsonLd) : ''
  useEffect(() => {
    const url = SITE_URL + path
    const img = image || DEFAULT_OG_IMAGE

    if (title) document.title = title
    if (description) upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', robots || 'index, follow, max-image-preview:large, max-snippet:-1')
    upsertLink('canonical', url)

    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:image', img)

    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:url', url)
    upsertMeta('name', 'twitter:image', img)

    setRouteJsonLd(jsonLd || null)
    return () => setRouteJsonLd(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, type, robots, ld])
}

const AUTHOR = { '@type': 'Person', name: SITE_NAME, url: SITE_URL }

/** BlogPosting schema for a single post. */
export function articleJsonLd(post) {
  const url = `${SITE_URL}/blog/${post.slug}`
  const date = isoDate(post.date)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    ...(date ? { datePublished: date, dateModified: date } : {}),
    author: { ...AUTHOR },
    publisher: { ...AUTHOR },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: DEFAULT_OG_IMAGE,
    articleSection: post.category,
    inLanguage: 'en',
    url,
  }
}

/** Blog index schema with the post list. */
export function blogJsonLd(posts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Writing — Kevin Bai',
    url: `${SITE_URL}/blog`,
    author: { ...AUTHOR },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      url: `${SITE_URL}/blog/${p.slug}`,
      ...(isoDate(p.date) ? { datePublished: isoDate(p.date) } : {}),
      articleSection: p.category,
    })),
  }
}

/** CollectionPage schema for an index that lists items {name, url, description}. */
export function collectionJsonLd({ name, path, items }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url: SITE_URL + path,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: SITE_URL + it.path,
        name: it.name,
      })),
    },
  }
}

/** WebApplication schema for an interactive tool. */
export function softwareJsonLd({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: SITE_URL + path,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { ...AUTHOR },
  }
}
