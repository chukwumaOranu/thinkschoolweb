import { Navigate, useParams } from 'react-router-dom'
import { getDashboardResource } from './config'
import ResourcePage from './resource-page'

const resourcePathMap: Record<string, string> = {
  header: 'headerSettings',
  navigation: 'headerNavItems',
  services: 'services',
  'feature-articles': 'featureArticles',
  'feature-updates': 'featureUpdates',
  testimonials: 'testimonials',
  team: 'teamMembers',
  pricing: 'pricingPlans',
  'contact-settings': 'contactSettings',
  'contact-submissions': 'contactSubmissions',
}

const DashboardResourceRoute = () => {
  const { section } = useParams()
  const resource = section ? getDashboardResource(resourcePathMap[section]) : null

  if (!resource) {
    return <Navigate to="/dashboard" replace />
  }

  return <ResourcePage resource={resource} />
}

export default DashboardResourceRoute
