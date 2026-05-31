import { useEffect } from 'react'

const Loader = () => {
  useEffect(() => {
    const style = document.getElementById('preloader')?.style
    setTimeout(() => {
      if (style) {
        style.visibility = 'hidden'
        style.opacity = '0'
      }
    }, 500)
  }, [])
  return (
    <div id="preloader">
      <div id="status">
        <div className="sk-chase">
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
        </div>
      </div>
    </div>
  )
}

export default Loader
