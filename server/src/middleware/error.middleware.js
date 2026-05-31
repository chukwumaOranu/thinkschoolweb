const notFound = (_req, res) => {
  res.status(404).json({ message: 'Route not found' })
}

const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500

  res.status(statusCode).json({
    message: error.message || 'Something went wrong',
  })
}

module.exports = {
  errorHandler,
  notFound,
}
