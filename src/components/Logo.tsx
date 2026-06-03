// ===== A+C Logo：星桥 + 猫爪星 + 多种动物爪印动态走过 =====

// 星中猫爪（缩小至 1/2）
const CatPaw = () => (
  <g transform="translate(200,44) scale(0.5) translate(-200,-44)">
    <path d="M200,54 C194,54 191,50 200,45 C209,50 206,54 200,54 Z" fill="#1a1a2e"/>
    <ellipse cx="190" cy="37" rx="4.5" ry="5.5" fill="#1a1a2e" transform="rotate(-10,190,37)"/>
    <ellipse cx="197" cy="34" rx="4.2" ry="5.5" fill="#1a1a2e" transform="rotate(-4,197,34)"/>
    <ellipse cx="204" cy="34" rx="4.2" ry="5.5" fill="#1a1a2e" transform="rotate(4,204,34)"/>
    <ellipse cx="211" cy="37" rx="4.5" ry="5.5" fill="#1a1a2e" transform="rotate(10,211,37)"/>
  </g>
)

// ===== 桥面贝塞尔公式 =====
const bridgeX = (t: number) => 20 + t * 360
const bridgeY = (t: number) => 130 - 300 * t * (1 - t)

// 桥面切线方向（弧度→角度），爪印沿桥面向右走
// dx/dt=360, dy/dt=-300+600t
const bridgeAngle = (t: number) => Math.atan2(-300 + 600 * t, 360) * (180 / Math.PI)

// 预计算关键帧路径：7 个采样点
const PATH_STOPS = [0.03, 0.18, 0.34, 0.50, 0.66, 0.82, 0.97]
const STEPS = PATH_STOPS.map(t => ({
  t,
  x: bridgeX(t),
  y: bridgeY(t),
  a: bridgeAngle(t),
}))

// 生成每只动物独立的关键帧名称（避免动画名冲突）
const makeKeyframeName = (idx: number) => `pawSlide${idx}`

// 注入 CSS @keyframes（在组件内通过 style 标签注入）
const keyframeCSS = (() => {
  return Array.from({ length: 5 }, (_, idx) => {
    const name = makeKeyframeName(idx)
    const stops = STEPS.map((s, i) => {
      const pct = Math.round((i / (STEPS.length - 1)) * 100)
      const ox = 0
      const oy = -4 // 略上偏移，踩在桥面上
      return `${pct}% { transform: translate(${s.x}px,${s.y + oy}px) rotate(${s.a}deg); opacity: ${i === 0 ? 0 : i >= STEPS.length - 1 ? 0 : 0.85}; }`
    }).join(' ')
    return `@keyframes ${name} { ${stops} }`
  }).join(' ')
})()

// ===== 不同动物爪印 SVG =====

// 所有爪印默认脚尖朝下(y负)，旋转90°后脚尖朝右(沿桥面向右走)
const PawCat = () => (
  <g transform="rotate(90)">
    <ellipse cx="0" cy="3" rx="3" ry="4" fill="#ffcd6a" opacity="0.9"/>
    <circle cx="-3.5" cy="-2.5" r="2.2" fill="#ffcd6a" opacity="0.85"/>
    <circle cx="-0.5" cy="-4" r="2.1" fill="#ffcd6a" opacity="0.85"/>
    <circle cx="2.5" cy="-4" r="2.1" fill="#ffcd6a" opacity="0.85"/>
    <circle cx="5.5" cy="-2.5" r="2.2" fill="#ffcd6a" opacity="0.85"/>
  </g>
)

const PawFrog = () => (
  <g transform="rotate(90)">
    <ellipse cx="0" cy="2" rx="2.5" ry="3" fill="#7ec87b" opacity="0.9"/>
    <circle cx="-4" cy="-2" r="1.8" fill="#7ec87b" opacity="0.85"/>
    <circle cx="0" cy="-4" r="1.8" fill="#7ec87b" opacity="0.85"/>
    <circle cx="4" cy="-2" r="1.8" fill="#7ec87b" opacity="0.85"/>
    <path d="M-3,-1 Q-2,-3 0,-2" fill="none" stroke="#7ec87b" strokeWidth="0.4" opacity="0.5"/>
    <path d="M0,-2 Q2,-3 3,-1" fill="none" stroke="#7ec87b" strokeWidth="0.4" opacity="0.5"/>
  </g>
)

const PawBunny = () => (
  <g transform="rotate(90)">
    <ellipse cx="0" cy="3" rx="2.5" ry="4.5" fill="#e8d5b0" opacity="0.9"/>
    <circle cx="-4" cy="-3" r="2" fill="#e8d5b0" opacity="0.85"/>
    <circle cx="-1" cy="-5" r="1.8" fill="#e8d5b0" opacity="0.85"/>
    <circle cx="2" cy="-5" r="1.8" fill="#e8d5b0" opacity="0.85"/>
    <circle cx="5" cy="-3" r="2" fill="#e8d5b0" opacity="0.85"/>
  </g>
)

const PawDog = () => (
  <g transform="rotate(90)">
    <ellipse cx="0" cy="3" rx="3.5" ry="4.5" fill="#e8c880" opacity="0.9"/>
    <circle cx="-4" cy="-2" r="2.3" fill="#e8c880" opacity="0.85"/>
    <circle cx="-1" cy="-4" r="2.2" fill="#e8c880" opacity="0.85"/>
    <circle cx="2.5" cy="-4.5" r="2.2" fill="#e8c880" opacity="0.85"/>
    <circle cx="5.5" cy="-2" r="2.3" fill="#e8c880" opacity="0.85"/>
  </g>
)

const PawBird = () => (
  <g transform="rotate(90)">
    <circle cx="0" cy="2" r="1.5" fill="#ffe0a0" opacity="0.85"/>
    <line x1="0" y1="1" x2="-3.5" y2="-3" stroke="#ffe0a0" strokeWidth="1.2" strokeLinecap="round" opacity="0.85"/>
    <line x1="0" y1="1" x2="0" y2="-4" stroke="#ffe0a0" strokeWidth="1.2" strokeLinecap="round" opacity="0.85"/>
    <line x1="0" y1="1" x2="3.5" y2="-3" stroke="#ffe0a0" strokeWidth="1.2" strokeLinecap="round" opacity="0.85"/>
  </g>
)

const PAW_TYPES = [PawCat, PawFrog, PawBunny, PawDog, PawBird]

// ===== 5种动物各1个爪印，轮流走过星桥 =====
const WalkingPaws = () => {
  const TRAIL_DURATION = 6

  return (
    <>
      <style>{keyframeCSS}</style>
      <g>
        {Array.from({ length: 5 }, (_, animalIdx) => {
          const PawComponent = PAW_TYPES[animalIdx]
          const animName = makeKeyframeName(animalIdx)
          const delay = animalIdx * 1.2

          return (
            <g
              key={animalIdx}
              style={{
                animation: `${animName} ${TRAIL_DURATION}s ease-in-out ${delay}s infinite`,
                opacity: 0,
              }}
            >
              <PawComponent />
            </g>
          )
        })}
      </g>
    </>
  )
}

export const StarBridgeLogo = () => (
  <svg viewBox="0 0 400 160" width="100%" style={{ maxWidth: 380, display: 'block', margin: '0 auto' }}>
    <defs>
      <linearGradient id="bigBridge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f0d080" stopOpacity="0.45"/>
        <stop offset="100%" stopColor="#f0d080" stopOpacity="0.02"/>
      </linearGradient>
      <linearGradient id="bridgeLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#f0d080" stopOpacity="0.1"/>
        <stop offset="50%" stopColor="#f0d080" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#f0d080" stopOpacity="0.1"/>
      </linearGradient>
      <radialGradient id="starGlow">
        <stop offset="0%" stopColor="#ffcd6a" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#ffcd6a" stopOpacity="0"/>
      </radialGradient>
    </defs>

    {/* === 虹桥 === */}
    <path d="M10 130 Q200 -30 390 130" fill="none" stroke="url(#bigBridge)" strokeWidth="20"/>
    <path d="M20 130 Q200 -20 380 130" fill="none" stroke="url(#bridgeLine)" strokeWidth="2"/>
    <path d="M40 130 Q200 0 360 130" fill="none" stroke="#f0d080" strokeWidth="0.8" opacity="0.4"/>

    {/* 桥面星光粒子 */}
    {Array.from({ length: 18 }).map((_, i) => {
      const t = i / 17
      const x = bridgeX(t)
      const y = bridgeY(t)
      const isBig = i % 4 === 0
      const r = isBig ? 3 : 1.8
      const a = 0.25 + t * (1 - t) * 2.8
      return (
        <g key={`star-${i}`}>
          <circle cx={x} cy={y} r={r} fill="#ffcd6a" opacity={a}/>
          {isBig && <circle cx={x} cy={y} r={r * 3} fill="#ffcd6a" opacity={a * 0.15}/>}
        </g>
      )
    })}

    {/* === 动态爪印走过星桥 === */}
    <WalkingPaws />

    {/* === 大星 + 内置猫爪 === */}
    <circle cx="200" cy="44" r="38" fill="url(#starGlow)"/>
    <path
      d="M200,10 L208,29 L230,31 L213,46 L218,65 L200,56 L182,65 L187,46 L170,31 L192,29 Z"
      fill="#f0d080" opacity="0.92" stroke="#ffcd6a" strokeWidth="1.2"
    />
    <CatPaw />

    {/* === 标题 === */}
    <text x="200" y="98" fontSize="40" fill="#f0d080" textAnchor="middle"
      fontFamily="'LXGW WenKai',sans-serif" fontWeight="bold"
      style={{ filter: 'drop-shadow(0 0 8px rgba(255,180,40,0.25))' }}>
      星桥
    </text>

    <text x="200" y="122" fontSize="13" fill="#c0a870" textAnchor="middle"
      fontFamily="'LXGW WenKai',sans-serif">
      🐾 记住那些温暖过我们人生的伙伴
    </text>
    <text x="200" y="142" fontSize="10" fill="#8a7a60" textAnchor="middle" letterSpacing="2"
      fontFamily="'LXGW WenKai',sans-serif">
      ANIMAL STARBRIDGE
    </text>
  </svg>
)
