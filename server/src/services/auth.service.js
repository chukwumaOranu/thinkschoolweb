const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { pool } = require('../config/database')

const sanitizeUser = (user) => ({
  id: user.id,
  username: user.username,
  firstName: user.first_name,
  lastName: user.last_name,
  email: user.email,
  status: user.status,
})

const signAccessToken = (user) =>
  jwt.sign(
    {
      sub: user.id,
      username: user.username,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES || '1d' },
  )

const getUserRoles = async (userId) => {
  const [roles] = await pool.query(
    `
      SELECT roles.slug
      FROM roles
      INNER JOIN user_roles ON user_roles.role_id = roles.id
      WHERE user_roles.user_id = ?
      ORDER BY roles.slug
    `,
    [userId],
  )

  return roles.map((role) => role.slug)
}

const findUserByUsername = async (username) => {
  const [users] = await pool.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username.trim()])
  return users[0]
}

const register = async ({ username, password, email, firstName, lastName }) => {
  const normalizedUsername = username.trim()
  const existingUser = await findUserByUsername(normalizedUsername)

  if (existingUser) {
    const error = new Error('Username is already registered')
    error.statusCode = 409
    throw error
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const connection = await pool.getConnection()

  try {
    await connection.beginTransaction()

    const [result] = await connection.query(
      `
        INSERT INTO users (username, email, first_name, last_name, password_hash, status)
        VALUES (?, ?, ?, ?, ?, 'active')
      `,
      [normalizedUsername, email || null, firstName || null, lastName || null, passwordHash],
    )

    await connection.query(
      `
        INSERT IGNORE INTO user_roles (user_id, role_id)
        SELECT ?, roles.id
        FROM roles
        WHERE roles.slug = 'user'
      `,
      [result.insertId],
    )

    await connection.commit()

    const user = await findUserByUsername(normalizedUsername)
    const roles = await getUserRoles(user.id)

    return {
      user: { ...sanitizeUser(user), roles },
      token: signAccessToken(user),
    }
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}

const login = async ({ username, password }) => {
  const user = await findUserByUsername(username)

  if (!user || user.status !== 'active') {
    const error = new Error('Invalid username or password')
    error.statusCode = 401
    throw error
  }

  const isMatch = await bcrypt.compare(password, user.password_hash)

  if (!isMatch) {
    const error = new Error('Invalid username or password')
    error.statusCode = 401
    throw error
  }

  await pool.query('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?', [user.id])

  const roles = await getUserRoles(user.id)

  return {
    user: { ...sanitizeUser(user), roles },
    token: signAccessToken(user),
  }
}

const getMe = async (userId) => {
  const [users] = await pool.query('SELECT * FROM users WHERE id = ? LIMIT 1', [userId])
  const user = users[0]

  if (!user) {
    const error = new Error('User not found')
    error.statusCode = 404
    throw error
  }

  const roles = await getUserRoles(user.id)

  return { ...sanitizeUser(user), roles }
}

module.exports = {
  getMe,
  login,
  register,
}
