import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  twinkle: number
}

export default function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create pixel stars
    const stars: Star[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random() * 0.6 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
    }))

    let animId: number
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const star of stars) {
        star.twinkle += 0.02
        const alpha = star.opacity + Math.sin(star.twinkle) * 0.2
        const color = Math.random() > 0.85 ? '#ffcd6a' : '#ffe9a6'

        ctx.fillStyle = color
        ctx.globalAlpha = Math.max(0.1, alpha)

        // Draw pixel star (small square)
        const x = Math.round(star.x)
        const y = Math.round(star.y)
        ctx.fillRect(x, y, star.size, star.size)

        // Slow drift upward
        star.y -= star.speed
        if (star.y < -10) {
          star.y = canvas.height + 10
          star.x = Math.random() * canvas.width
        }
      }

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="star-canvas"
      aria-hidden="true"
    />
  )
}
