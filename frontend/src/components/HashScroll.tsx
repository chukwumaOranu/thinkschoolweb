import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const HashScroll = () => {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const scrollToHash = () => {
      const target = document.getElementById(location.hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    const timeout = window.setTimeout(scrollToHash, 120)
    return () => window.clearTimeout(timeout)
  }, [location.pathname, location.hash])

  return null
}

export default HashScroll
