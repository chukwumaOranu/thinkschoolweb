import { Route, Routes } from 'react-router-dom'
import { appRoutes } from './index'
import AppLayout from '@/components/AppLayout'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/app/(dashboard)/layout'

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {appRoutes
            .filter((route) => route.protected)
            .map((route, idx) => {
              const Page = route.component

              return <Route key={idx + route.name} path={route.path} element={<Page />} />
            })}
        </Route>
      </Route>
      {appRoutes.map((route, idx) => {
        const Page = route.component
        const element = route.layout === 'marketing' ? (
          <AppLayout>
            <Page />
          </AppLayout>
        ) : (
          <Page />
        )

        if (route.protected) return null

        return <Route key={idx + route.name} path={route.path} element={element} />
      })}
    </Routes>
  )
}

export default AppRouter
