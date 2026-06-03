import { animals } from '../data/animals'
import { SITE_NAME, SITE_DESCRIPTION } from '../data/constants'
import AnimalGrid from '../components/AnimalGrid'

export default function HomePage() {
  const sorted = [...animals].sort(
    (a, b) => new Date(b.deathDate).getTime() - new Date(a.deathDate).getTime()
  )

  return (
    <div className="py-8 text-center" style={{ maxWidth: 960, margin: '0 auto' }}>
      {/* Hero */}
      <section className="py-10 md:py-16" style={{ textAlign: 'center' }}>
        <span className="text-5xl md:text-6xl inline-block">⭐</span>
        <h2 className="text-3xl md:text-4xl text-[#f0d080] my-3" style={{ fontFamily: "'Yozai', sans-serif", textAlign: 'center' }}>
          {SITE_NAME}
        </h2>
        <p className="text-base md:text-lg text-[#c0a870] mb-1" style={{ fontFamily: "'Yozai', sans-serif", textAlign: 'center' }}>
          {SITE_DESCRIPTION}
        </p>
        <p className="text-sm text-[#a09070] leading-relaxed" style={{ fontFamily: "'Yozai', sans-serif", textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
          它们来过、被爱过、留下过痕迹。这里是它们的星之归处——一座连接人间与动物星球的温暖桥梁。
        </p>
      </section>

      <div className="pixel-divider" />

      {/* Title */}
      <h3 className="text-xl text-[#f0d080] my-6" style={{ fontFamily: "'Yozai', sans-serif", textAlign: 'center' }}>
        🕯️ 星桥上的小伙伴们
      </h3>

      {/* Animals */}
      <AnimalGrid animals={sorted} />

      {/* Footer quote */}
      <div className="py-10" style={{ textAlign: 'center' }}>
        <div className="pixel-divider" />
        <p className="text-sm text-[#a09070] italic leading-relaxed mt-6" style={{ fontFamily: "'Yozai', sans-serif", textAlign: 'center', maxWidth: 440, margin: '24px auto 0' }}>
          「它们没有消失，只是走过了那座星光之桥。每当有人点亮烛光，夜空就多了一颗星。」
        </p>
        <div className="pixel-divider mt-6" />
      </div>
    </div>
  )
}
