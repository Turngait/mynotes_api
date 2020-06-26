const { Router } = require('express')
const {API_MAIL} = require('../config/api')
const User = require('../models/user_model')
const sequelize = require('../mysql/index')
// const nodemailer = require('nodemailer')
// const sendgrid = require('nodemailer-sendgrid-transport')
const router = Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.find({email: 'wulzin.t@gmail.com'})
    console.log(users)

    await sequelize.sync()

    const transporter = nodemailer.createTransport(sendgrid({
      auth: {api_key: API_MAIL}
    }))
    // transporter.sendMail({
    //   to: 'ryzhov.is@mail.ru',
    //   from: 'MyNotes<info@fraktur.ru>',
    //   subject: 'Тестовое письмо с ноды',
    //   html: '<h1>Привет!</h1><p>Это тестовое письмо с ноды!</p>'
    // })
    res.send('MyNotes API')
  } catch (e) {
    console.log(e)
  }

})

module.exports = router
