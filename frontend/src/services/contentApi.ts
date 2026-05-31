import { apiRequest } from './api'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export type HeaderContent = {
  settings: {
    id: number
    logo_light_url: string
    logo_dark_url: string
    logo_alt: string
    cta_label?: string | null
    cta_url?: string | null
  } | null
  navItems: {
    id: number
    label: string
    href: string
    sort_order: number
  }[]
}

export type StartupContent = {
  services: {
    id: number
    icon: string | null
    title: string
    description: string
    sort_order: number
  }[]
  testimonials: {
    id: number
    image_url: string | null
    name: string
    role: string | null
    rating: number
    description: string
    sort_order: number
  }[]
  teamMembers: {
    id: number
    image_url: string | null
    name: string
    role: string
    bio: string | null
    twitter_url: string | null
    facebook_url: string | null
    linkedin_url: string | null
    sort_order: number
  }[]
  pricingPlans: {
    id: number
    name: string
    description: string | null
    price: number | null
    currency: string
    billing_period: string | null
    billing_note: string | null
    button_label: string | null
    button_url: string | null
    badge_label: string | null
    theme: string | null
    sort_order: number
    images: {
      pricing_plan_id: number
      image_url: string
      alt_text: string | null
      sort_order: number
    }[]
  }[]
  contactSettings: {
    id: number
    heading: string
    description: string | null
    phone_label: string | null
    phone: string | null
    email_label: string | null
    email: string | null
  } | null
}

export type ContactSubmissionPayload = {
  name: string
  email: string
  plan?: string
  subject: string
  message: string
}

export type FeatureArticle = {
  id: number
  icon: string | null
  title: string
  slug: string
  excerpt: string | null
  content: string
  image_url: string | null
  published_at: string | null
  sort_order: number
}

export type FeatureUpdate = {
  id: number
  feature_article_id: number | null
  icon: string | null
  title: string
  description: string
  version_label: string | null
  release_date: string | null
  sort_order: number
}

export type FeaturesContent = {
  articles: FeatureArticle[]
  updates: FeatureUpdate[]
}

export const resolveAssetUrl = (url?: string | null) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url
  if (url.startsWith('/uploads/')) return `${API_URL}${url}`
  return url
}

export const getHeaderContent = () => apiRequest<HeaderContent>('/api/content/header')

export const getStartupContent = () => apiRequest<StartupContent>('/api/content/startup')

export const getFeaturesContent = () => apiRequest<FeaturesContent>('/api/content/features')

export const getFeatureContent = (slug: string) =>
  apiRequest<{ article: FeatureArticle; updates: FeatureUpdate[] }>(`/api/content/features/${slug}`)

export const submitContact = (payload: ContactSubmissionPayload) =>
  apiRequest<{ submission: { id: number } }>('/api/content/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
