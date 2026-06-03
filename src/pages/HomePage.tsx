import { animals } from '../data/animals'
import { SITE_NAME, SITE_DESCRIPTION } from '../data/constants'
import AnimalGrid from '../components/AnimalGrid'
import QuoteSection from '../components/QuoteSection'

export default function HomePage() {
  // Sort by death date, most recent first
  const sorted = [...animals].sort(
    (a, b) => new Date(b.deathDate).getTime() - new Date(a.deathDate).getTime()
  )

  return (
    <div className="py-8">
      {/* Hero */}
      <section className="text-center py-12 md:py-20">
        <div className="mb-6">
          <span className="text-6xl md:text-8xl inline-block pixel-text">
            ⭐
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl text-[#e8a840] pixel-text mb-4">
          {SITE_NAME}
        </h2>
        <p className="text-lg md:text-xl text-[#c4a97d] mb-2 pixel-text">
          {SITE_DESCRIPTION}
        </p>
        <p className="text-sm text-[#c4a97d]/50 max-w-lg mx-auto leading-relaxed">
          它们来过、被爱过、留下过痕迹。这里是它们的星之归处——
          一座连接人间与动物星球的温暖桥梁。
        </p>
      </section>

      {/* Pixel divider */}
      <div className="pixel-divider mb-10" />

      {/* Animal Grid */}
      <section>
        <h3 className="text-xl text-[#e8a840] pixel-text mb-6 text-center">
          🕯️ 星桥上的小伙伴们
        </h3>
        <AnimalGrid animals={sorted} />
      </section>

      {/* Quote */}
      <QuoteSection />
    </div>
  )
}
