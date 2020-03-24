const { Router } = require('express')
const AuthController = require('../controllers/auth_controller')

const router = Router()

router.get('/', (req, res) => {
  res.status(403)
})

router.post('/signin', async (req, res) => {
  AuthController.signIn(req, res)
})

router.post('/signup', async (req, res) => {
  AuthController.signUp(req, res)
})

module.exports = router
