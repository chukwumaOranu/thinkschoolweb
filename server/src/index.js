require('dotenv').config({ path: process.env.ENV_FILE || '.env.development' })

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const path = require('path')
const authRoutes = require('./routes/auth.routes')
const adminRoutes = require('./routes/admin.routes')
const uploadRoutes = require('./routes/upload.routes')
const publicRoutes = require('./routes/public.routes')
const { errorHandler, notFound } = require('./middleware/error.middleware')

const app = express()
const port = Number(process.env.PORT || 5000)
const allowedOrigins = (process.env.CORS_ORIGINS || process.env.CLIENT_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error(`CORS blocked origin: ${origin}`))
  },
  credentials: true,
}

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
)
app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')))

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'thinkschool-api' })
})

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/uploads', uploadRoutes)
app.use('/api/content', publicRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, '0.0.0.0', () => {
  console.log(`API listening on port ${port}`)
})
