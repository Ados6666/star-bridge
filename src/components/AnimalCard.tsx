import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Animal } from '../data/types'

const STORAGE_PREFIX = 'starbridge_candle_'

function getCandleCount(animalId: string): number {
  const stored = localStorage.getItem(`${STORAGE_PREFIX}${animalId}`)
  return stored ? parseInt(stored, 10) : 0
}
function hasLitCandle(animalId: string): boolean {
  return localStorage.getItem(`${STORAGE_PREFIX}${animalId}_lit`) === 'true'
}

export default function AnimalCard({ animal }: { animal: Animal }) {
  const [count, setCount] = useState(0)
  const [lit, setLit] = useState(false)
  const [lighting, setLighting] = useState(false)

  useEffect(() => {
    setCount(getCandleCount(animal.id))
    setLit(hasLitCandle(animal.id))
  }, [animal.id])

  const handleLight = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (lit || lighting) return
    setLighting(true)
    const newCount = count + 1
    localStorage.setItem(`${STORAGE_PREFIX}${animal.id}`, newCount.toString())
    localStorage.setItem(`${STORAGE_PREFIX}${animal.id}_lit`, 'true')
    setCount(newCount)
    setTimeout(() => { setLit(true); setLighting(false) }, 600)
  }

  // Generate spark directions for animation
  const sparks = Array.from({ length: 5 }, (_, i) => ({
    '--sx': `${(Math.random() - 0.5) * 30}px`,
    '--sy': `${-10 - Math.random() * 15}px`,
  } as React.CSSProperties))

  return (
    <Link to={`/animal/${animal.id}`} className="animal-card no-underline">
      {/* Photo frame */}
      <div className="photo-frame">
        <img
          src={animal.coverImage}
          alt={animal.name}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%230b1a30" width="200" height="200"/><text x="100" y="105" text-anchor="middle" font-size="60">🐾</text></svg>'
          }}
        />
      </div>

      {/* Name */}
      <div className="card-name">{animal.name}</div>

      {/* Short intro */}
      <div className="card-intro">{animal.introduction.slice(0, 40)}</div>

      {/* Candle button */}
      <div className="candle-btn-wrap">
        <button
          className={`candle-btn ${lit ? 'lit' : ''} ${lighting ? 'lighting' : ''}`}
          onClick={handleLight}
          disabled={lit}
          title={lit ? '你已经点亮蜡烛了 ✨' : '点击点亮蜡烛'}
        >
          {/* Glow ring */}
          <div className="candle-glow-ring" />

          {/* Flame */}
          <div className="candle-flame">
            <div className="flame-inner" />
          </div>

          {/* Spark burst on lighting */}
          <div className="spark-burst">
            {sparks.map((style, i) => (
              <div key={i} className="spark-particle" style={style} />
            ))}
          </div>

          {/* Candle body */}
          <div className="candle-body" />
          <div className="candle-base" />
        </button>

        {/* Candle count */}
        <div className="candle-count">
          点亮蜡烛的小伙伴：{count}人
        </div>
      </div>
    </Link>
  )
}
