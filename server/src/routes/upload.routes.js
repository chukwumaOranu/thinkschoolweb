const express = require('express')
const uploadController = require('../controllers/upload.controller')
const { authenticate } = require('../middleware/auth.middleware')
const { uploadImage } = require('../middleware/upload.middleware')

const router = express.Router()

router.use(authenticate)

router.get('/presets', uploadController.presets)
router.post('/:preset', uploadImage.single('image'), uploadController.upload)

module.exports = router
