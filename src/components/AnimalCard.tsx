import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { Animal } from '../data/types'

const STORAGE_PREFIX = 'starbridge_candle_'

function getCandleCount(animalId: string): number {
  const stored = localStorage.getItem(`${STORAGE_PREFIX}${animalId}`)
  return stored ? parseInt(stored, 10) : 0
}

export default function AnimalCard({ animal }: { animal: Animal }) {
  const [count, setCount] = useState(0)
  const [bigFlame, setBigFlame] = useState(false)

  useEffect(() => {
    setCount(getCandleCount(animal.id))
  }, [animal.id])

  // Each click increments count + gives flame grow feedback
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newCount = count + 1
    localStorage.setItem(`${STORAGE_PREFIX}${animal.id}`, newCount.toString())
    setCount(newCount)
    setBigFlame(true)
    setTimeout(() => setBigFlame(false), 400)
  }, [animal.id, count])

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
          点亮蜡烛的小伙伴：{count}人
        </div>
      </div>
    </Link>
  )
}
