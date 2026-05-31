export type FieldType = 'text' | 'textarea' | 'number' | 'checkbox'

export type ResourceGroup = 'site' | 'sections' | 'features' | 'contact'

export type DashboardResource = {
  key: string
  title: string
  description: string
  path: string
  icon: string
  group: ResourceGroup
  fields: {
    name: string
    label: string
    type?: FieldType
    required?: boolean
  }[]
}

export const groupMeta: Record<ResourceGroup, { label: string; icon: string }> = {
  site: { label: 'Site Config', icon: 'tabler:settings-2' },
  sections: { label: 'Page Sections', icon: 'tabler:layout-rows' },
  features: { label: 'Features', icon: 'tabler:sparkles' },
  contact: { label: 'Contact', icon: 'tabler:mail' },
}

export const dashboardResources: DashboardResource[] = [
  {
    key: 'headerSettings',
    title: 'Header Logo',
    description: 'Logo, alt text, and header call-to-action.',
    path: '/dashboard/header',
    icon: 'tabler:photo',
    group: 'site' as const,
    fields: [
      { name: 'logo_light_url', label: 'Light Logo URL', required: true },
      { name: 'logo_dark_url', label: 'Dark Logo URL', required: true },
      { name: 'logo_alt', label: 'Logo Alt', required: true },
      { name: 'cta_label', label: 'CTA Label' },
      { name: 'cta_url', label: 'CTA URL' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },
  {
    key: 'headerNavItems',
    title: 'Header Navigation',
    description: 'Navigation labels, anchors, and ordering.',
    path: '/dashboard/navigation',
    icon: 'tabler:menu-2',
    group: 'site' as const,
    fields: [
      { name: 'label', label: 'Label', required: true },
      { name: 'href', label: 'Href', required: true },
      { name: 'sort_order', label: 'Sort Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },
  {
    key: 'services',
    title: 'Services',
    description: 'Service cards displayed on the startup page.',
    path: '/dashboard/services',
    icon: 'tabler:briefcase',
    group: 'sections' as const,
    fields: [
      { name: 'icon', label: 'Icon' },
      { name: 'title', label: 'Title', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'sort_order', label: 'Sort Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },
  {
    key: 'featureArticles',
    title: 'Feature Articles',
    description: 'Blog-style feature page articles.',
    path: '/dashboard/feature-articles',
    icon: 'tabler:article',
    group: 'features' as const,
    fields: [
      { name: 'icon', label: 'Icon' },
      { name: 'title', label: 'Title', required: true },
      { name: 'slug', label: 'Slug', required: true },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'content', label: 'Content', type: 'textarea', required: true },
      { name: 'image_url', label: 'Image URL' },
      { name: 'published_at', label: 'Published Date' },
      { name: 'sort_order', label: 'Sort Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },
  {
    key: 'featureUpdates',
    title: 'Added Features',
    description: 'Feature updates and module notes shown on the features page.',
    path: '/dashboard/feature-updates',
    icon: 'tabler:sparkles',
    group: 'features' as const,
    fields: [
      { name: 'feature_article_id', label: 'Feature Article ID', type: 'number' },
      { name: 'icon', label: 'Icon' },
      { name: 'title', label: 'Title', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'version_label', label: 'Version Label' },
      { name: 'release_date', label: 'Release Date' },
      { name: 'sort_order', label: 'Sort Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },
  {
    key: 'testimonials',
    title: 'Testimonials',
    description: 'Reviews displayed on the startup page.',
    path: '/dashboard/testimonials',
    icon: 'tabler:message-star',
    group: 'sections' as const,
    fields: [
      { name: 'image_url', label: 'Image URL' },
      { name: 'name', label: 'Name', required: true },
      { name: 'role', label: 'Role' },
      { name: 'rating', label: 'Rating', type: 'number' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'sort_order', label: 'Sort Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },
  {
    key: 'teamMembers',
    title: 'Team',
    description: 'Team member profiles and social links.',
    path: '/dashboard/team',
    icon: 'tabler:users',
    group: 'sections' as const,
    fields: [
      { name: 'image_url', label: 'Image URL' },
      { name: 'name', label: 'Name', required: true },
      { name: 'role', label: 'Role', required: true },
      { name: 'bio', label: 'Bio', type: 'textarea' },
      { name: 'twitter_url', label: 'Twitter URL' },
      { name: 'facebook_url', label: 'Facebook URL' },
      { name: 'linkedin_url', label: 'LinkedIn URL' },
      { name: 'sort_order', label: 'Sort Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },
  {
    key: 'pricingPlans',
    title: 'Pricing',
    description: 'Membership pricing cards.',
    path: '/dashboard/pricing',
    icon: 'tabler:receipt-2',
    group: 'sections' as const,
    fields: [
      { name: 'name', label: 'Name', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'price', label: 'Price', type: 'number' },
      { name: 'currency', label: 'Currency' },
      { name: 'billing_period', label: 'Billing Period' },
      { name: 'billing_note', label: 'Billing Note' },
      { name: 'button_label', label: 'Button Label' },
      { name: 'button_url', label: 'Button URL' },
      { name: 'badge_label', label: 'Badge Label' },
      { name: 'theme', label: 'Theme' },
      { name: 'sort_order', label: 'Sort Order', type: 'number' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },
  {
    key: 'contactSettings',
    title: 'Contact Settings',
    description: 'Contact section copy, phone, and email.',
    path: '/dashboard/contact-settings',
    icon: 'tabler:address-book',
    group: 'contact' as const,
    fields: [
      { name: 'heading', label: 'Heading', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'phone_label', label: 'Phone Label' },
      { name: 'phone', label: 'Phone' },
      { name: 'email_label', label: 'Email Label' },
      { name: 'email', label: 'Email' },
      { name: 'is_active', label: 'Active', type: 'checkbox' },
    ],
  },
  {
    key: 'contactSubmissions',
    title: 'Contact Submissions',
    description: 'Messages from the contact form.',
    path: '/dashboard/contact-submissions',
    icon: 'tabler:inbox',
    group: 'contact' as const,
    fields: [
      { name: 'plan_name', label: 'Plan' },
      { name: 'name', label: 'Name', required: true },
      { name: 'email', label: 'Email', required: true },
      { name: 'subject', label: 'Subject', required: true },
      { name: 'message', label: 'Message', type: 'textarea', required: true },
      { name: 'status', label: 'Status' },
    ],
  },
]

export const getDashboardResource = (key: string) => dashboardResources.find((resource) => resource.key === key)
