const uploadService = require('../services/upload.service')

const upload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(422).json({ message: 'Image file is required' })
    }

    const uploadResult = await uploadService.processImage({
      file: req.file,
      presetName: req.params.preset || req.body.preset || 'general',
    })

    const hostUrl = `${req.protocol}://${req.get('host')}`

    return res.status(201).json({
      file: {
        ...uploadResult,
        url: `${hostUrl}${uploadResult.path}`,
      },
    })
  } catch (error) {
    return next(error)
  }
}

const presets = (_req, res) => {
  const { imagePresets } = require('../config/imagePresets')
  res.json({ presets: imagePresets })
}

module.exports = {
  presets,
  upload,
}
