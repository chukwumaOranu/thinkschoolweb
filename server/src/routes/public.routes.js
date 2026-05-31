const express = require('express')
const publicContentController = require('../controllers/publicContent.controller')

const router = express.Router()

router.get('/header', publicContentController.header)
router.get('/startup', publicContentController.startup)
router.get('/features', publicContentController.features)
router.get('/features/:slug', publicContentController.featureBySlug)
router.post('/contact', publicContentController.submitContact)

module.exports = router
