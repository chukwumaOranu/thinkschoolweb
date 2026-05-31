const express = require('express')
const { body } = require('express-validator')
const authController = require('../controllers/auth.controller')
const { authenticate } = require('../middleware/auth.middleware')
const { validateRequest } = require('../middleware/validate.middleware')

const router = express.Router()

router.post(
  '/register',
  [
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('email').optional({ checkFalsy: true }).isEmail().withMessage('Enter a valid email address'),
    body('firstName').optional({ checkFalsy: true }).trim(),
    body('lastName').optional({ checkFalsy: true }).trim(),
  ],
  validateRequest,
  authController.register,
)

router.post(
  '/login',
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  authController.login,
)

router.get('/me', authenticate, authController.me)

module.exports = router
