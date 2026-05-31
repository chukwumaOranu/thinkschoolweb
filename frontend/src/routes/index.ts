import { lazy, type ComponentType } from 'react'
import type { RouteProps } from 'react-router-dom'

const Startup = lazy(() => import('@/app/(pages)/startup/page'))
const Features = lazy(() => import('@/app/(pages)/features/page'))
const FeaturePost = lazy(() => import('@/app/(pages)/features/post'))
const LegalPage = lazy(() => import('@/app/(pages)/legal/page'))
const Plans = lazy(() => import('@/app/(pages)/plans/page'))
const Login = lazy(() => import('@/app/(auth)/login/page'))
const Register = lazy(() => import('@/app/(auth)/register/page'))
const Dashboard = lazy(() => import('@/app/(dashboard)/page'))
const DashboardResourceRoute = lazy(() => import('@/app/(dashboard)/resource-route'))

export type RoutesProps = {
  path: RouteProps['path']
  name: string
  component: ComponentType
  layout?: 'marketing' | 'plain'
  protected?: boolean
  exact?: boolean
}

const demoPages: RoutesProps[] = [
  {
    path: '/',
    name: 'root',
    component: Startup,
    layout: 'marketing',
  },
  {
    path: '/startup',
    name: 'Startup',
    component: Startup,
    layout: 'marketing',
  },
  {
    path: '/features',
    name: 'Features',
    component: Features,
    layout: 'marketing',
  },
  {
    path: '/features/:slug',
    name: 'FeaturePost',
    component: FeaturePost,
    layout: 'marketing',
  },
  {
    path: '/plans',
    name: 'Plans',
    component: Plans,
    layout: 'marketing',
  },
  {
    path: '/terms',
    name: 'Terms',
    component: LegalPage,
    layout: 'marketing',
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: LegalPage,
    layout: 'marketing',
  },
  {
    path: '/data-protection',
    name: 'DataProtection',
    component: LegalPage,
    layout: 'marketing',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    layout: 'plain',
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    layout: 'plain',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    layout: 'plain',
    protected: true,
  },
  {
    path: '/dashboard/:section',
    name: 'DashboardResource',
    component: DashboardResourceRoute,
    layout: 'plain',
    protected: true,
  },
]

export const appRoutes = [...demoPages]
