const { pool } = require('../config/database')
const { sendContactEmails } = require('./email.service')

const getHeader = async () => {
  const [settings] = await pool.query(
    `
      SELECT id, logo_light_url, logo_dark_url, logo_alt, cta_label, cta_url
      FROM header_settings
      WHERE is_active = 1
      ORDER BY id DESC
      LIMIT 1
    `,
  )

  const [navItems] = await pool.query(
    `
      SELECT id, label, href, sort_order
      FROM header_nav_items
      WHERE is_active = 1
      ORDER BY sort_order, id
    `,
  )

  return {
    settings: settings[0] || null,
    navItems,
  }
}

const listActive = async (table, columns = '*') => {
  const [rows] = await pool.query(
    `
      SELECT ${columns}
      FROM ${table}
      WHERE is_active = 1
      ORDER BY sort_order, id
    `,
  )

  return rows
}

const getStartup = async () => {
  const [contactSettings] = await pool.query(
    `
      SELECT id, heading, description, phone_label, phone, email_label, email
      FROM contact_settings
      WHERE is_active = 1
      ORDER BY id DESC
      LIMIT 1
    `,
  )

  const [pricingPlans] = await pool.query(
    `
      SELECT id, name, description, price, currency, billing_period, billing_note, button_label, button_url, badge_label, theme, sort_order
      FROM pricing_plans
      WHERE is_active = 1
      ORDER BY sort_order, id
    `,
  )

  const [pricingImages] = await pool.query(
    `
      SELECT pricing_plan_id, image_url, alt_text, sort_order
      FROM pricing_plan_images
      ORDER BY sort_order, id
    `,
  )

  const imagesByPlan = pricingImages.reduce((grouped, image) => {
    const key = String(image.pricing_plan_id)
    grouped[key] = grouped[key] || []
    grouped[key].push(image)
    return grouped
  }, {})

  return {
    services: await listActive('services', 'id, icon, title, description, sort_order'),
    testimonials: await listActive('testimonials', 'id, image_url, name, role, rating, description, sort_order'),
    teamMembers: await listActive(
      'team_members',
      'id, image_url, name, role, bio, twitter_url, facebook_url, linkedin_url, sort_order',
    ),
    pricingPlans: pricingPlans.map((plan) => ({
      ...plan,
      images: imagesByPlan[String(plan.id)] || [],
    })),
    contactSettings: contactSettings[0] || null,
  }
}

const getFeatures = async () => ({
  articles: await listActive(
    'feature_articles',
    'id, icon, title, slug, excerpt, content, image_url, published_at, sort_order',
  ),
  updates: await listActive(
    'feature_updates',
    'id, feature_article_id, icon, title, description, version_label, release_date, sort_order',
  ),
})

const getFeatureBySlug = async (slug) => {
  const [articles] = await pool.query(
    `
      SELECT id, icon, title, slug, excerpt, content, image_url, published_at, sort_order
      FROM feature_articles
      WHERE slug = ? AND is_active = 1
      LIMIT 1
    `,
    [slug],
  )

  if (!articles[0]) {
    const error = new Error('Feature not found')
    error.statusCode = 404
    throw error
  }

  const [updates] = await pool.query(
    `
      SELECT id, feature_article_id, icon, title, description, version_label, release_date, sort_order
      FROM feature_updates
      WHERE is_active = 1 AND (feature_article_id = ? OR feature_article_id IS NULL)
      ORDER BY sort_order, id
    `,
    [articles[0].id],
  )

  return {
    article: articles[0],
    updates,
  }
}

const createContactSubmission = async ({ name, email, plan, subject, message }) => {
  const [result] = await pool.query(
    `
      INSERT INTO contact_submissions (plan_name, name, email, subject, message, status)
      VALUES (?, ?, ?, ?, ?, 'new')
    `,
    [plan || null, name, email, subject, message],
  )

  const submission = { id: result.insertId, name, email, plan, subject, message }

  try {
    await sendContactEmails(submission)
  } catch (error) {
    console.error('Contact emails failed:', error.message)
  }

  return { id: result.insertId }
}

module.exports = {
  createContactSubmission,
  getFeatureBySlug,
  getFeatures,
  getHeader,
  getStartup,
}
