import { animals } from '../data/animals'
import { HOME } from '../data/content'
import AnimalGrid from '../components/AnimalGrid'

const s = { fontFamily: "'Yozai', sans-serif", textAlign: 'center' as const }

export default function HomePage() {
  const sorted = [...animals].sort(
    (a, b) => new Date(b.deathDate).getTime() - new Date(a.deathDate).getTime()
  )

  return (
    <div className="py-8" style={{ maxWidth: 960, margin: '0 auto' }}>
      <section className="py-10 md:py-16" style={s}>
        <span className="text-5xl md:text-6xl inline-block">{HOME.heroStar}</span>
        <h2 className="text-3xl md:text-4xl text-[#f0d080] my-3" style={s}>{HOME.title}</h2>
        <p className="text-base md:text-lg text-[#c0a870] mb-1" style={s}>{HOME.subtitle}</p>
        <p className="text-sm text-[#a09070] leading-relaxed" style={{ ...s, maxWidth: 480, margin: '0 auto' }}>{HOME.description}</p>
      </section>

      <div className="pixel-divider" />

      <h3 className="text-xl text-[#f0d080] my-6" style={s}>{HOME.gridTitle}</h3>

      <AnimalGrid animals={sorted} />

      <div className="py-10" style={s}>
        <div className="pixel-divider" />
        <p className="text-sm text-[#a09070] italic leading-relaxed mt-6" style={{ ...s, maxWidth: 440, margin: '24px auto 0' }}>
          {HOME.footerQuote}
        </p>
        <div className="pixel-divider mt-6" />
      </div>
    </div>
  )
}
