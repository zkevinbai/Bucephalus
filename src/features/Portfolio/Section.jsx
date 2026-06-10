import Container from '../../components/Container'

/** A titled portfolio section with an eyebrow + serif heading. */
export default function Section({ id, eyebrow, title, intro, children, size = 'page' }) {
  return (
    <section id={id} className="scroll-mt-24 py-14 md:py-20">
      <Container size={size}>
        <div className="reveal mb-10 max-w-reading">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="mt-3 font-serif text-[2rem] font-semibold leading-[1.1] tracking-[-0.01em] text-ink md:text-[2.6rem]">
            {title}
          </h2>
          {intro && <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">{intro}</p>}
        </div>
        {children}
      </Container>
    </section>
  )
}
