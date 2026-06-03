import { useParams, Link } from 'react-router-dom'
import { animals } from '../data/animals'
import Timeline from '../components/Timeline'
import PhotoGallery from '../components/PhotoGallery'
import CandleSection from '../components/CandleSection'

export default function AnimalDetailPage() {
  const { id } = useParams<{ id: string }>()
  const animal = animals.find((a) => a.id === id)

  if (!animal) {
    return (
      <div className="py-20 text-center">
        <p className="text-4xl mb-4 pixel-text">🐾</p>
        <h2 className="text-xl text-[#e8a840] pixel-text mb-2">
          这个小伙伴还没来到星桥
        </h2>
        <p className="text-sm text-[#c4a97d] mb-6">
          也许它正在路上，请再等等……
        </p>
        <Link to="/" className="pixel-btn no-underline inline-block text-sm">
          ← 回到星桥
        </Link>
      </div>
    )
  }

  return (
    <div className="py-8">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-[#c4a97d] hover:text-[#e8a840] no-underline mb-6 pixel-text"
      >
        ← 回到星桥
      </Link>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        {/* Cover photo */}
        <div className="w-full md:w-80 shrink-0">
          <div className="pixel-border p-2 bg-[#1a1a2e]/50">
            <img
              src={animal.coverImage}
              alt={animal.name}
              className="w-full aspect-square object-cover"
              onError={(e) => {
                const t = e.target as HTMLImageElement
                t.style.display = 'none'
              }}
            />
            {/* Fallback when no image */}
            <div
              className="w-full aspect-square flex items-center justify-center text-6xl bg-[#1a1a2e]"
              style={{ display: animal.coverImage ? 'none' : 'flex' }}
            >
              🐾
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl text-[#e8a840] pixel-text m-0">
              {animal.name}
            </h1>
            <p className="text-[#c4a97d] text-sm mt-1">
              {animal.species}
              {animal.age ? ` · ${animal.age}` : ''}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {animal.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs border border-[#e8a840]/30 text-[#e8a840]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Dates */}
          <div className="text-xs text-[#c4a97d]/70 font-mono space-y-1">
            {animal.birthDate && <p className="m-0">🌟 来到这个世界：{animal.birthDate}</p>}
            <p className="m-0">🕯️ 回到动物星球：{animal.deathDate}</p>
          </div>

          {/* Introduction */}
          <p className="text-sm text-[#e2e8f0]/80 leading-relaxed m-0">
            {animal.introduction}
          </p>

          {/* Source */}
          <p className="text-xs text-[#c4a97d]/50 m-0">
            信息来源：{animal.source}
            {animal.sourceUrl && (
              <a
                href={animal.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e8a840]/70 hover:text-[#e8a840] ml-1 underline"
              >
                [查看原文]
              </a>
            )}
          </p>
        </div>
      </div>

      <div className="pixel-divider mb-8" />

      {/* Story Section */}
      {animal.story && (
        <>
          <section className="mb-10">
            <h3 className="text-xl text-[#e8a840] pixel-text mb-4">
              📖 它的故事
            </h3>
            <div className="text-sm text-[#e2e8f0]/80 leading-relaxed whitespace-pre-line">
              {animal.story}
            </div>
          </section>
          <div className="pixel-divider mb-8" />
        </>
      )}

      {/* Fun Facts */}
      {animal.funFacts.length > 0 && (
        <>
          <section className="mb-10">
            <h3 className="text-xl text-[#e8a840] pixel-text mb-4">
              💛 关于它的趣事
            </h3>
            <ul className="space-y-2">
              {animal.funFacts.map((fact, i) => (
                <li
                  key={i}
                  className="text-sm text-[#e2e8f0]/80 flex items-start gap-2"
                >
                  <span className="text-[#e8a840] mt-0.5">▸</span>
                  {fact}
                </li>
              ))}
            </ul>
          </section>
          <div className="pixel-divider mb-8" />
        </>
      )}

      {/* Timeline */}
      <section className="mb-10">
        <h3 className="text-xl text-[#e8a840] pixel-text mb-4">
          ⏳ 生命旅程
        </h3>
        <Timeline events={animal.timeline} />
      </section>

      <div className="pixel-divider mb-8" />

      {/* Photo Gallery */}
      <section className="mb-10">
        <h3 className="text-xl text-[#e8a840] pixel-text mb-4">
          📷 影像记忆
        </h3>
        <PhotoGallery photos={animal.photos} />
      </section>

      <div className="pixel-divider mb-8" />

      {/* Candle Section */}
      <section>
        <CandleSection animalId={animal.id} />
      </section>
    </div>
  )
}
