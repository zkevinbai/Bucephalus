import { useParams, Link } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import Container from '../../components/Container'
import ToyLayout from './ToyLayout'
import { getToy } from './toysData'
import { trackEvent } from '../../utils/analytics'
import { useSeo, softwareJsonLd } from '../../utils/seo'

export default function ToyPage() {
  const { slug } = useParams()
  const toy = getToy(slug)

  useEffect(() => {
    if (toy?.Component) trackEvent('toy_open', { toy_slug: toy.slug, toy_name: toy.name })
  }, [toy])

  useSeo(
    toy?.Component
      ? {
          title: `${toy.name} — Kevin Bai`,
          description: toy.blurb,
          path: `/toys/${toy.slug}`,
          jsonLd: softwareJsonLd({ name: toy.name, description: toy.blurb, path: `/toys/${toy.slug}` }),
        }
      : { title: 'Toy not found — Kevin Bai', path: `/toys/${slug}`, robots: 'noindex, follow' }
  )

  if (!toy || !toy.Component) {
    return (
      <Container size="reading" className="pt-40 pb-20 text-center">
        <h1 className="font-serif text-3xl font-semibold text-ink">Toy not found</h1>
        <Link to="/toys" className="mt-6 inline-block font-medium text-clay-deep hover:text-clay">
          ← Back to toys
        </Link>
      </Container>
    )
  }

  const { Component } = toy
  return (
    <ToyLayout toy={toy}>
      <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
        <Component />
      </Suspense>
    </ToyLayout>
  )
}
