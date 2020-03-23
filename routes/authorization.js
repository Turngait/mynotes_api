const { Router } = require('express')
const crypto = require('crypto')
const user_model = require('../models/user_model')
const User = require('../models/User')
const DTO = require('../models/dto')
const {createPassword} = require('../config/security')
const AuthController = require('../controllers/auth_controller')

const router = Router()

router.get('/', (req, res) => {
  res.status(403)
})

router.post('/signin', async (req, res) => {
  AuthController.signIn(req, res)
})

router.post('/signup', async (req, res) => {
  const response = new DTO()
  const paper = crypto.createHash('md5').update(String(Date.now())).digest('hex')
  const pass = createPassword(req.body.pass, paper)
  const date = new Date().toISOString().slice(0,10)
  const user = new user_model({
    name: req.body.name,
    email: req.body.email,
    pass,
    paper,
    wishlist: [],
    createdAt: date
  })
  try {
    await user.save()
    res.status(202)
    response.setStatus(202)
    response.setStatusText('User created')
    response.setData({})
    res.json(response.getResponse())
  } catch(e) {
    res.status(503)
    response.setStatus(503)
    response.setStatusText('Server error')
    res.json(response.getResponse())
  }
})

module.exports = router
