const crypto = require('crypto')
const fs = require('fs/promises')
const path = require('path')
const sharp = require('sharp')
const { imagePresets } = require('../config/imagePresets')

const uploadsRoot = path.resolve(process.cwd(), 'uploads')

const getPreset = (presetName = 'general') => {
  const preset = imagePresets[presetName]

  if (!preset) {
    const error = new Error('Unknown image preset')
    error.statusCode = 404
    throw error
  }

  return preset
}

const getExtension = (format) => (format === 'jpeg' ? 'jpg' : format)

const processImage = async ({ file, presetName }) => {
  const preset = getPreset(presetName)
  const source = sharp(file.buffer, { failOn: 'error' }).rotate()
  const metadata = await source.metadata()
  const folder = preset.folder || presetName || 'general'
  const outputDir = path.join(uploadsRoot, folder)
  const format = preset.format || 'webp'
  const filename = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${getExtension(format)}`
  const outputPath = path.join(outputDir, filename)

  await fs.mkdir(outputDir, { recursive: true })

  let transformer = source.resize({
    width: preset.width,
    height: preset.height,
    fit: preset.fit || 'inside',
    withoutEnlargement: preset.withoutEnlargement ?? true,
    background: preset.background,
  })

  if (format === 'png') {
    transformer = transformer.png({ compressionLevel: 9, adaptiveFiltering: true })
  } else if (format === 'jpeg') {
    transformer = transformer.jpeg({ quality: 84, mozjpeg: true })
  } else {
    transformer = transformer.webp({ quality: 84 })
  }

  await transformer.toFile(outputPath)

  const processedMetadata = await sharp(outputPath).metadata()
  const relativePath = `/uploads/${folder}/${filename}`

  return {
    preset: presetName,
    originalName: file.originalname,
    mimeType: file.mimetype,
    path: relativePath,
    width: processedMetadata.width,
    height: processedMetadata.height,
    format: processedMetadata.format,
    original: {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: file.size,
    },
  }
}

module.exports = {
  processImage,
}
