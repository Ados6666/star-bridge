import { useState, useEffect } from 'react'

const STORAGE_PREFIX = 'starbridge_candle_'

function getCandleCount(animalId: string): number {
  const stored = localStorage.getItem(`${STORAGE_PREFIX}${animalId}`)
  return stored ? parseInt(stored, 10) : 0
}

function setCandleCount(animalId: string, count: number) {
  localStorage.setItem(`${STORAGE_PREFIX}${animalId}`, count.toString())
}

function hasLitCandle(animalId: string): boolean {
  return localStorage.getItem(`${STORAGE_PREFIX}${animalId}_lit`) === 'true'
}

function markCandleLit(animalId: string) {
  localStorage.setItem(`${STORAGE_PREFIX}${animalId}_lit`, 'true')
}

export default function CandleSection({ animalId }: { animalId: string }) {
  const [count, setCount] = useState(0)
  const [lit, setLit] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    setCount(getCandleCount(animalId))
    setLit(hasLitCandle(animalId))
  }, [animalId])

  const handleLight = () => {
    if (lit || animating) return
    setAnimating(true)
    const newCount = count + 1
    setCandleCount(animalId, newCount)
    markCandleLit(animalId)
    setCount(newCount)
    setTimeout(() => {
      setLit(true)
      setAnimating(false)
    }, 600)
  }

  return (
    <div className="text-center py-8">
      <p className="text-sm text-[#c4a97d] mb-4 pixel-text">
        已有 <span className="text-[#ffcd6a] text-lg">{count}</span> 人点亮了蜡烛
      </p>

      {/* Candle */}
      <button
        onClick={handleLight}
        disabled={lit}
        className="relative inline-flex flex-col items-center cursor-pointer bg-transparent border-0 p-0"
        title={lit ? '你已经点过蜡烛了' : '点击点亮蜡烛'}
      >
        {/* Candle body */}
        <div
          className={`w-6 h-12 rounded-sm transition-all ${
            lit
              ? 'bg-[#e8a840] shadow-[0_0_20px_rgba(255,205,106,0.6)]'
              : 'bg-[#c4a97d]/30 hover:bg-[#c4a97d]/50'
          }`}
        />
        {/* Candle base */}
        <div className="w-10 h-2 bg-[#8b6d4a] border border-[#6b4c1a]" />

        {/* Flame (animated when lit) */}
        {lit && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div
              className="w-3 h-4 bg-[#ffcd6a] rounded-full"
              style={{
                animation: 'flicker 0.3s ease-in-out infinite, glow-pulse 2s ease-in-out infinite',
                boxShadow: '0 0 15px rgba(255,205,106,0.8), 0 0 30px rgba(255,205,106,0.4)',
              }}
            />
          </div>
        )}

        {/* Lighting animation */}
        {animating && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
            <div
              className="w-2 h-3 bg-[#ffcd6a] rounded-full animate-ping"
              style={{ animation: 'flicker 0.15s ease-in-out infinite' }}
            />
          </div>
        )}
      </button>

      <p className="text-xs text-[#c4a97d]/60 mt-4 m-0">
        {lit ? '✨ 你的祝福已经送到了星桥的另一端' : '点击蜡烛，送出一份无声的祝福'}
      </p>
    </div>
  )
}
