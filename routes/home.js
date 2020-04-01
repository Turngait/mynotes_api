const { Router } = require('express')
const User = require('../models/user_model')
const sequelize = require('../mysql/index')
const router = Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.find({email: 'wulzin.t@gmail.com'})
    console.log(users)

    await sequelize.sync()
    res.send('MyNotes API')
  } catch (e) {
    console.log(e)
  }

})

module.exports = router
