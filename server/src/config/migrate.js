require('dotenv').config({ path: process.env.ENV_FILE || '.env.development' })

const fs = require('fs/promises')
const path = require('path')
const mysql = require('mysql2/promise')

const migrationsDir = path.join(__dirname, 'migrations')

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const normalizeSql = (sql) =>
  sql
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim().toUpperCase()
      return !trimmed.startsWith('CREATE DATABASE') && !trimmed.startsWith('CHARACTER SET') && !trimmed.startsWith('COLLATE') && !trimmed.startsWith('USE ')
    })
    .join('\n')

const getConnection = async () => {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
  }

  for (let attempt = 1; attempt <= 30; attempt += 1) {
    try {
      return await mysql.createConnection(config)
    } catch (error) {
      if (attempt === 30) throw error
      await wait(2000)
    }
  }
}

const run = async () => {
  const connection = await getConnection()

  await connection.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      filename VARCHAR(255) NOT NULL,
      applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_schema_migrations_filename (filename)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `)

  const [appliedRows] = await connection.query('SELECT filename FROM schema_migrations')
  const applied = new Set(appliedRows.map((row) => row.filename))
  const files = (await fs.readdir(migrationsDir)).filter((file) => file.endsWith('.sql')).sort()

  for (const file of files) {
    if (applied.has(file)) {
      console.log(`Skipping migration ${file}`)
      continue
    }

    const filePath = path.join(migrationsDir, file)
    const sql = normalizeSql(await fs.readFile(filePath, 'utf8')).trim()

    if (sql) {
      console.log(`Applying migration ${file}`)
      await connection.query(sql)
    }

    await connection.query('INSERT INTO schema_migrations (filename) VALUES (?)', [file])
  }

  await connection.end()
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
