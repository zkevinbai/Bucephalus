import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import Container from '../../components/Container'
import ToyLayout from './ToyLayout'
import { getToy } from './toysData'
import { trackEvent } from '../../utils/analytics'

export default function ToyPage() {
  const { slug } = useParams()
  const toy = getToy(slug)

  useEffect(() => {
    if (toy?.Component) trackEvent('toy_open', { toy_slug: toy.slug, toy_name: toy.name })
  }, [toy])

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
      <Component />
    </ToyLayout>
  )
}
