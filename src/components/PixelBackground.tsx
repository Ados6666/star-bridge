import { useEffect, useRef } from 'react'

interface Star {
  x: number; y: number; size: number; speed: number; opacity: number; twinkle: number; cross: boolean
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

    // More and bigger stars, some with 4-point cross shape
    const stars: Star[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3.5 + 1,
      speed: Math.random() * 0.15 + 0.02,
      opacity: Math.random() * 0.7 + 0.15,
      twinkle: Math.random() * Math.PI * 2,
      cross: Math.random() > 0.7, // 30% are cross stars (bigger hand-drawn look)
    }))

    const bridgeStarCount = 50

    function drawStar(cx: number, cy: number, r: number, alpha: number, color: string) {
      if (r < 2.5) {
        // Small star: just a glow dot
        ctx.fillStyle = `rgba(${color},${alpha})`
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Big hand-drawn star: 4-point cross shape
        ctx.fillStyle = `rgba(${color},${alpha * 0.9})`
        ctx.beginPath()
        // Vertical
        ctx.roundRect(cx - r * 0.35, cy - r, r * 0.7, r * 2, r * 0.3)
        // Horizontal
        ctx.roundRect(cx - r, cy - r * 0.35, r * 2, r * 0.7, r * 0.3)
        ctx.fill()

        // Center glow
        ctx.fillStyle = `rgba(${color},${alpha})`
        ctx.beginPath()
        ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let animId: number
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2
      const cy = canvas.height * 0.30
      const bridgeWidth = canvas.width * 0.85 // wider, spans the page
      const bridgeHeight = canvas.height * 0.20
      bridgePhase.current += 0.003

      // Draw star bridge — wide golden arc
      for (let i = 0; i < bridgeStarCount; i++) {
        const t = i / (bridgeStarCount - 1)
        const x = cx - bridgeWidth / 2 + t * bridgeWidth
        const archY = cy - Math.sin(t * Math.PI) * bridgeHeight
        const wave = Math.sin(t * 4 + bridgePhase.current) * 4
        const y = archY + wave

        const pulse = 0.35 + 0.65 * Math.sin(t * 7 - bridgePhase.current * 3)
        const alpha = 0.1 + pulse * 0.45
        const dotSize = 2 + pulse * 3.5

        // Draw as 4-point star for bigger dots
        if (dotSize > 4) {
          ctx.fillStyle = `rgba(255,210,110,${alpha})`
          ctx.beginPath()
          ctx.roundRect(x - dotSize * 0.2, y - dotSize, dotSize * 0.4, dotSize * 2, 1)
          ctx.roundRect(x - dotSize, y - dotSize * 0.2, dotSize * 2, dotSize * 0.4, 1)
          ctx.fill()
        }

        ctx.fillStyle = `rgba(255,210,110,${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, dotSize * 0.55, 0, Math.PI * 2)
        ctx.fill()

        // Glow
        ctx.fillStyle = `rgba(255,210,110,${alpha * 0.2})`
        ctx.beginPath()
        ctx.arc(x, y, dotSize * 2.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw scattered background stars
      for (const star of stars) {
        star.twinkle += 0.012
        const alpha = Math.max(0.06, star.opacity + Math.sin(star.twinkle) * 0.2)
        const isWarm = (star.y < canvas.height * 0.5 && star.x > canvas.width * 0.1 && star.x < canvas.width * 0.9)
        const color = isWarm ? '255,215,140' : '180,200,225'

        if (star.cross) {
          drawStar(star.x, star.y, star.size * 2.5, alpha, color)
        } else {
          ctx.fillStyle = `rgba(${color},${alpha})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fill()
          // Small glow for all
          ctx.fillStyle = `rgba(${color},${alpha * 0.2})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2)
          ctx.fill()
        }

        star.y -= star.speed
        if (star.y < -10) { star.y = canvas.height + 10; star.x = Math.random() * canvas.width; star.twinkle = Math.random() * Math.PI * 2 }
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
