import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { Animal } from '../data/types'
import { CARD } from '../data/content'

const LOCLIT_KEY = 'sb_lit_'

// Check local flag: has this browser already submitted to this animal?
function wasLitLocally(animalId: string): boolean {
  return localStorage.getItem(`${LOCLIT_KEY}${animalId}`) === '1'
}
function markLitLocally(animalId: string) {
  localStorage.setItem(`${LOCLIT_KEY}${animalId}`, '1')
}

async function fetchCount(animalId: string): Promise<number> {
  try {
    const res = await fetch(`/api/candle/${animalId}`)
    if (!res.ok) return 0
    const data = await res.json()
    return data.count ?? 0
  } catch { return 0 }
}

async function lightCandle(animalId: string): Promise<{ count: number; alreadyLit: boolean }> {
  try {
    const res = await fetch(`/api/candle/${animalId}`, { method: 'POST' })
    if (!res.ok) return { count: 0, alreadyLit: false }
    return await res.json()
  } catch { return { count: 0, alreadyLit: false } }
}

export default function AnimalCard({ animal }: { animal: Animal }) {
  const [count, setCount] = useState(0)
  const [bigFlame, setBigFlame] = useState(false)
  const [lit, setLit] = useState(false)
  const [loading, setLoading] = useState(false)

  // Load count on mount
  useEffect(() => {
    fetchCount(animal.id).then(setCount)
    setLit(wasLitLocally(animal.id))
  }, [animal.id])

  const handleClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (loading) return

    setLoading(true)
    const result = await lightCandle(animal.id)
    setCount(result.count)

    if (!result.alreadyLit) {
      markLitLocally(animal.id)
      setLit(true)
    }

    setBigFlame(true)
    setTimeout(() => { setBigFlame(false); setLoading(false) }, 400)
  }, [animal.id, loading])

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

      {/* Candle — always lit, click = big flame */}
      <div className="candle-btn-wrap">
        <button
          className={`candle-btn lit${bigFlame ? ' big-flame' : ''}`}
          onClick={handleClick}
          title="点击为它送上一份祝福"
        >
          {/* Glow ring */}
          <div className="candle-glow-ring" />

          {/* Flame — always shown, grows on click */}
          <div className="candle-flame">
            <div className="flame-inner" />
          </div>

          {/* Candle body */}
          <div className="candle-body" />
          <div className="candle-base" />
        </button>

        {/* Candle count */}
        <div className="candle-count">
          {CARD.candleCountText(count)}
        </div>
      </div>
    </Link>
  )
}
