const multer = require('multer')

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])
const maxFileSizeMb = Number(process.env.MAX_FILE_SIZE_MB || 50)

const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxFileSizeMb * 1024 * 1024,
    files: 1,
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      return callback(new Error('Only JPG, PNG, and WebP images are allowed'))
    }

    return callback(null, true)
  },
})

module.exports = {
  uploadImage,
}
