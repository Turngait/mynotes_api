const { Router } = require('express')
const User = require('../models/user')
const router = Router()

router.get('/', async (req, res) => {
  const user = new User('email@email.ru')
  user.connectToMongo()
  res.send('MyNotes API')
})

module.exports = router
