import { Suspense } from 'react'
import { LayoutProvider } from './context/useLayoutContext'
import Loader from './components/Loader'
import AppRouter from './routes/router'
import HashScroll from './components/HashScroll'

import '@/assets/scss/style.scss'

function App() {
  return (
    <>
      <LayoutProvider>
        <HashScroll />
        <Suspense fallback={<Loader />}>
          <AppRouter />
        </Suspense>
      </LayoutProvider>
    </>
  )
}

export default App
