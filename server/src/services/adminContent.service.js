const { pool } = require('../config/database')

const resources = {
  headerSettings: {
    table: 'header_settings',
    orderBy: 'id',
    fields: ['logo_light_url', 'logo_dark_url', 'logo_alt', 'cta_label', 'cta_url', 'is_active'],
  },
  headerNavItems: {
    table: 'header_nav_items',
    orderBy: 'sort_order, id',
    fields: ['label', 'href', 'sort_order', 'is_active'],
  },
  services: {
    table: 'services',
    orderBy: 'sort_order, id',
    fields: ['icon', 'title', 'description', 'sort_order', 'is_active'],
  },
  testimonials: {
    table: 'testimonials',
    orderBy: 'sort_order, id',
    fields: ['image_url', 'name', 'role', 'rating', 'description', 'sort_order', 'is_active'],
  },
  teamMembers: {
    table: 'team_members',
    orderBy: 'sort_order, id',
    fields: ['image_url', 'name', 'role', 'bio', 'twitter_url', 'facebook_url', 'linkedin_url', 'sort_order', 'is_active'],
  },
  pricingPlans: {
    table: 'pricing_plans',
    orderBy: 'sort_order, id',
    fields: ['name', 'description', 'price', 'currency', 'billing_period', 'billing_note', 'button_label', 'button_url', 'badge_label', 'theme', 'sort_order', 'is_active'],
  },
  pricingPlanImages: {
    table: 'pricing_plan_images',
    orderBy: 'sort_order, id',
    fields: ['pricing_plan_id', 'image_url', 'alt_text', 'sort_order'],
  },
  contactSettings: {
    table: 'contact_settings',
    orderBy: 'id',
    fields: ['heading', 'description', 'phone_label', 'phone', 'email_label', 'email', 'is_active'],
  },
  contactSubmissions: {
    table: 'contact_submissions',
    orderBy: 'created_at DESC, id DESC',
    fields: ['service_id', 'plan_name', 'name', 'email', 'subject', 'message', 'status'],
    readonlyCreate: false,
  },
  featureArticles: {
    table: 'feature_articles',
    orderBy: 'sort_order, id',
    fields: ['icon', 'title', 'slug', 'excerpt', 'content', 'image_url', 'published_at', 'sort_order', 'is_active'],
  },
  featureUpdates: {
    table: 'feature_updates',
    orderBy: 'sort_order, id',
    fields: ['feature_article_id', 'icon', 'title', 'description', 'version_label', 'release_date', 'sort_order', 'is_active'],
  },
}

const getConfig = (resource) => {
  const config = resources[resource]
  if (!config) {
    const error = new Error('Unknown resource')
    error.statusCode = 404
    throw error
  }
  return config
}

const list = async (resource) => {
  const config = getConfig(resource)
  const [rows] = await pool.query(`SELECT * FROM ${config.table} ORDER BY ${config.orderBy}`)
  return rows
}

const getById = async (resource, id) => {
  const config = getConfig(resource)
  const [rows] = await pool.query(`SELECT * FROM ${config.table} WHERE id = ? LIMIT 1`, [id])
  if (!rows[0]) {
    const error = new Error('Record not found')
    error.statusCode = 404
    throw error
  }
  return rows[0]
}

const pickData = (config, data) =>
  config.fields.reduce((picked, field) => {
    if (Object.prototype.hasOwnProperty.call(data, field)) {
      picked[field] = data[field]
    }
    return picked
  }, {})

const create = async (resource, data) => {
  const config = getConfig(resource)
  const picked = pickData(config, data)
  const fields = Object.keys(picked)

  if (!fields.length) {
    const error = new Error('No valid fields provided')
    error.statusCode = 422
    throw error
  }

  const placeholders = fields.map(() => '?').join(', ')
  const [result] = await pool.query(
    `INSERT INTO ${config.table} (${fields.join(', ')}) VALUES (${placeholders})`,
    fields.map((field) => picked[field]),
  )

  return getById(resource, result.insertId)
}

const update = async (resource, id, data) => {
  const config = getConfig(resource)
  const picked = pickData(config, data)
  const fields = Object.keys(picked)

  if (!fields.length) {
    const error = new Error('No valid fields provided')
    error.statusCode = 422
    throw error
  }

  await pool.query(
    `UPDATE ${config.table} SET ${fields.map((field) => `${field} = ?`).join(', ')} WHERE id = ?`,
    [...fields.map((field) => picked[field]), id],
  )

  return getById(resource, id)
}

const remove = async (resource, id) => {
  const config = getConfig(resource)
  const [result] = await pool.query(`DELETE FROM ${config.table} WHERE id = ?`, [id])
  return { deleted: result.affectedRows > 0 }
}

const summary = async () => {
  const entries = await Promise.all(
    Object.entries(resources)
      .filter(([key]) => key !== 'pricingPlanImages')
      .map(async ([key, config]) => {
        const [rows] = await pool.query(`SELECT COUNT(*) AS count FROM ${config.table}`)
        return [key, rows[0].count]
      }),
  )

  return Object.fromEntries(entries)
}

module.exports = {
  create,
  getById,
  list,
  remove,
  resources,
  summary,
  update,
}
