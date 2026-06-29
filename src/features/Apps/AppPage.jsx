import { useParams, Link } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import Container from '../../components/Container'
import AppLayout from './AppLayout'
import { getApp } from './appsData'
import { trackEvent } from '../../utils/analytics'
import { useSeo, softwareJsonLd } from '../../utils/seo'

export default function AppPage() {
  const { slug } = useParams()
  const toy = getApp(slug)

  useEffect(() => {
    if (toy?.Component) trackEvent('toy_open', { toy_slug: toy.slug, toy_name: toy.name })
  }, [toy])

  useSeo(
    toy?.Component
      ? {
          title: `${toy.name} — Kevin Bai`,
          description: toy.blurb,
          path: `/apps/${toy.slug}`,
          jsonLd: softwareJsonLd({ name: toy.name, description: toy.blurb, path: `/apps/${toy.slug}` }),
        }
      : { title: 'App not found — Kevin Bai', path: `/apps/${slug}`, robots: 'noindex, follow' }
  )

  if (!toy || !toy.Component) {
    return (
      <Container size="reading" className="pt-40 pb-20 text-center">
        <h1 className="font-serif text-3xl font-semibold text-ink">App not found</h1>
        <Link to="/apps" className="mt-6 inline-block font-medium text-clay-deep hover:text-clay">
          ← Back to apps
        </Link>
      </Container>
    )
  }

  const { Component } = toy
  return (
    <AppLayout toy={toy}>
      <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
        <Component />
      </Suspense>
    </AppLayout>
  )
}
