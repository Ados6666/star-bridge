import { animals } from '../data/animals'
import { HOME } from '../data/content'
import AnimalGrid from '../components/AnimalGrid'
import { StarBridgeLogo } from '../components/Logo'

const s = { fontFamily: "'LXGW WenKai', sans-serif", textAlign: 'center' as const }

export default function HomePage() {
  const sorted = [...animals].sort(
    (a, b) => new Date(b.deathDate).getTime() - new Date(a.deathDate).getTime()
  )

  return (
    <div className="py-8" style={{ maxWidth: 960, margin: '0 auto' }}>
      {/* Hero with combined logo */}
      <section className="py-10 md:py-14" style={s}>
        <StarBridgeLogo />
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
