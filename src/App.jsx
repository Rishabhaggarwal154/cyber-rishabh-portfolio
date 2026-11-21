import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
const isHome = normalizedPath === '/' || normalizedPath === '/index.html'

export default function App() {
  useEffect(() => {
    if (!isHome) return undefined

    const hash = decodeURIComponent(window.location.hash.slice(1))
    if (!hash) return undefined

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="min-h-screen bg-ink text-bright">
      <Navbar />
      {isHome ? <Home /> : <NotFound />}
      <Footer />
      <ScrollToTop />
    </div>
  )
}
