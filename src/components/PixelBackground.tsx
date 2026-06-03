import { useEffect, useRef } from 'react'

interface Star {
  x: number; y: number; size: number; speed: number; opacity: number; twinkle: number
}

export default function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bridgePhase = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const stars: Star[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.2 + 0.03,
      opacity: Math.random() * 0.7 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
    }))

    const bridgeStarCount = 40

    let animId: number
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2
      const cy = canvas.height * 0.32
      const bridgeWidth = Math.min(canvas.width * 0.7, 600)
      const bridgeHeight = canvas.height * 0.22
      bridgePhase.current += 0.004

      // Draw star bridge — curved arc of glowing golden dots
      for (let i = 0; i < bridgeStarCount; i++) {
        const t = i / (bridgeStarCount - 1)
        const x = cx - bridgeWidth / 2 + t * bridgeWidth
        const archY = cy - Math.sin(t * Math.PI) * bridgeHeight
        const wave = Math.sin(t * 5 + bridgePhase.current) * 3
        const y = archY + wave

        const pulse = 0.4 + 0.6 * Math.sin(t * 8 - bridgePhase.current * 3)
        const alpha = 0.15 + pulse * 0.5
        const dotSize = 1 + pulse * 2

        ctx.fillStyle = `rgba(255,205,106,${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, dotSize, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(255,205,106,${alpha * 0.25})`
        ctx.beginPath()
        ctx.arc(x, y, dotSize * 3.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw scattered stars
      for (const star of stars) {
        star.twinkle += 0.015
        const alpha = star.opacity + Math.sin(star.twinkle) * 0.15
        const isWarm = star.y < canvas.height * 0.45
        const r = isWarm ? 255 : 180
        const g = isWarm ? 220 : 200
        const b = isWarm ? 140 : 220

        ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0.05, alpha)})`
        const sx = Math.round(star.x)
        const sy = Math.round(star.y)
        ctx.fillRect(sx, sy, star.size, star.size)

        if (star.size > 1.2) {
          ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0.02, alpha * 0.3)})`
          ctx.fillRect(sx - 1, sy - 1, star.size + 2, star.size + 2)
        }

        star.y -= star.speed
        if (star.y < -10) { star.y = canvas.height + 10; star.x = Math.random() * canvas.width }
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <canvas ref={canvasRef} id="star-canvas" aria-hidden="true" />
}
