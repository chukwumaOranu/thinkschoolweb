const express = require('express')
const adminContentController = require('../controllers/adminContent.controller')
const { authenticate } = require('../middleware/auth.middleware')

const router = express.Router()

router.use(authenticate)

router.get('/summary', adminContentController.summary)
router.get('/:resource', adminContentController.list)
router.post('/:resource', adminContentController.create)
router.get('/:resource/:id', adminContentController.getById)
router.put('/:resource/:id', adminContentController.update)
router.delete('/:resource/:id', adminContentController.remove)

module.exports = router
