import { Link, useLocation } from 'react-router-dom'
import { SITE_NAME, SITE_NAME_EN } from '../data/constants'

const NAV = [
  { to: '/', label: '🏠 星桥' },
  { to: '/about', label: '📖 关于' },
  { to: '/suggest', label: '💡 建议' },
]

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="w-full py-4 px-4 md:px-8 relative z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="no-underline flex items-center gap-2 group">
          <span className="text-2xl md:text-3xl pixel-text text-[#e8a840] group-hover:text-[#ffcd6a] transition-colors">
            ⭐
          </span>
          <div>
            <h1 className="text-lg md:text-xl pixel-text text-[#e8a840] m-0 leading-tight">
              {SITE_NAME}
            </h1>
            <p className="text-xs text-[#c4a97d] m-0 leading-tight">
              {SITE_NAME_EN}
            </p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex gap-1 md:gap-4">
          {NAV.map(({ to, label }) => {
            const active = to === '/'
              ? pathname === '/'
              : pathname.startsWith(to)
            return (
              <Link
                key={to}
                to={to}
                className={`no-underline px-3 py-1.5 text-sm transition-all ${
                  active
                    ? 'text-[#e8a840] pixel-border bg-[#e8a840]/10'
                    : 'text-[#c4a97d] hover:text-[#e8a840]'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
