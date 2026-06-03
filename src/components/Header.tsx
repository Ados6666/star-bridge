import { Link, useLocation } from 'react-router-dom'
import { SITE_NAME, SITE_NAME_EN } from '../data/constants'
import { NAV } from '../data/content'

const NAV_ITEMS = [
  { to: '/', label: NAV.home },
  { to: '/about', label: NAV.about },
  { to: '/suggest', label: NAV.suggest },
]

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="w-full py-4 px-4 relative z-10">
      <div className="max-w-[960px] mx-auto flex items-center justify-between">
        <Link to="/" className="no-underline flex items-center gap-2 group">
          <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform inline-block">
            ⭐
          </span>
          <div>
            <h1 className="text-lg md:text-xl text-[#f0d080] m-0 leading-tight" style={{ fontFamily: "'ZCOOL KuaiLe', sans-serif" }}>
              {SITE_NAME}
            </h1>
            <p className="text-xs text-[#7eb8da] m-0 leading-tight">
              {SITE_NAME_EN}
            </p>
          </div>
        </Link>

        <nav className="flex gap-1 md:gap-4">
          {NAV_ITEMS.map(({ to, label }) => {
            const active = to === '/'
              ? pathname === '/'
              : pathname.startsWith(to)
            return (
              <Link
                key={to}
                to={to}
                className={`nav-link no-underline ${active ? 'active' : ''}`}
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
