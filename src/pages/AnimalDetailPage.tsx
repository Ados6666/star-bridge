import { useParams, Link } from 'react-router-dom'
import { animals } from '../data/animals'
import Timeline from '../components/Timeline'
import PhotoGallery from '../components/PhotoGallery'

const h3Style = { fontFamily: "'ZCOOL KuaiLe', sans-serif" }

export default function AnimalDetailPage() {
  const { id } = useParams<{ id: string }>()
  const animal = animals.find((a) => a.id === id)

  if (!animal) {
    return (
      <div className="py-20 text-center">
        <p className="text-4xl mb-4">🐾</p>
        <h2 className="text-xl text-[#f0d080] mb-2" style={h3Style}>
          这个小伙伴还没来到星桥
        </h2>
        <p className="text-sm text-[#7eb8da] mb-6" style={h3Style}>
          也许它正在路上，请再等等……
        </p>
        <Link to="/" className="pixel-btn no-underline inline-block">
          ← 回到星桥
        </Link>
      </div>
    )
  }

  return (
    <div className="py-8" style={{ maxWidth: 720, margin: '0 auto' }}>
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-[#7eb8da] hover:text-[#f0d080] no-underline mb-6"
        style={h3Style}
      >
        ← 回到星桥
      </Link>

      {/* Hero */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-72 shrink-0">
          <div className="photo-frame">
            <img
              src={animal.coverImage}
              alt={animal.name}
              onError={(e) => {
                const t = e.target as HTMLImageElement
                t.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%230b1a30" width="200" height="200"/><text x="100" y="105" text-anchor="middle" font-size="60">🐾</text></svg>'
              }}
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl text-[#f0d080] m-0 mb-1" style={h3Style}>
            {animal.name}
          </h1>
          <p className="text-sm text-[#7eb8da] mb-3" style={h3Style}>
            {animal.species}{animal.age ? ` · ${animal.age}` : ''}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {animal.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-xs border border-[#e8a840]/30 text-[#e8a840]" style={h3Style}>
                {tag}
              </span>
            ))}
          </div>

          <div className="text-xs text-[#6088a8] space-y-1 mb-2" style={h3Style}>
            {animal.birthDate && <p>🌟 来到这个世界：{animal.birthDate}</p>}
            <p>🕯️ 回到动物星球：{animal.deathDate}</p>
          </div>

          <p className="text-sm text-[#dce6f0]/80 leading-relaxed" style={h3Style}>
            {animal.introduction}
          </p>

          <p className="text-xs text-[#486880] mt-3" style={h3Style}>
            信息来源：{animal.source}
            {animal.sourceUrl && (
              <a href={animal.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[#7eb8da] hover:text-[#f0d080] ml-1 underline">
                [查看原文]
              </a>
            )}
          </p>
        </div>
      </div>

      <div className="pixel-divider mb-6" />

      {/* Fun Facts */}
      {animal.funFacts.length > 0 && (
        <>
          <section className="mb-8">
            <h3 className="text-lg text-[#f0d080] mb-3" style={h3Style}>💛 趣事</h3>
            <ul className="space-y-2">
              {animal.funFacts.map((fact, i) => (
                <li key={i} className="text-sm text-[#dce6f0]/80 flex items-start gap-2" style={h3Style}>
                  <span className="text-[#e8a840]">▸</span> {fact}
                </li>
              ))}
            </ul>
          </section>
          <div className="pixel-divider mb-6" />
        </>
      )}

      {/* Timeline */}
      <section className="mb-8">
        <h3 className="text-lg text-[#f0d080] mb-3" style={h3Style}>⏳ 生命旅程</h3>
        <Timeline events={animal.timeline} />
      </section>

      <div className="pixel-divider mb-6" />

      {/* Photo Gallery */}
      <section className="mb-8">
        <h3 className="text-lg text-[#f0d080] mb-3" style={h3Style}>📷 影像记忆</h3>
        <PhotoGallery photos={animal.photos} />
      </section>
    </div>
  )
}
