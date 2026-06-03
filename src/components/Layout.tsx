import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import PixelBackground from './PixelBackground'

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen">
      <PixelBackground />
      <Header />
      <main className="page-content flex-1 px-4 md:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
