import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import PixelBackground from './PixelBackground'

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      alignItems: 'center',
    }}>
      <PixelBackground />
      <Header />
      <main className="page-content" style={{ flex: 1, width: '100%', maxWidth: 960, padding: '0 16px' }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
