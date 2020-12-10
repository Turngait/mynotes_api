const { Router } = require('express')
// const {API_MAIL} = require('../config/api')
// const User = require('../models/user_model')
const sequelize = require('../mysql/index')
var fetch = require('node-fetch');
// const nodemailer = require('nodemailer')
// const sendgrid = require('nodemailer-sendgrid-transport')
const router = Router()

router.get('/', async (req, res) => {
  try {
    const AUTH_URL = 'http://auth:4000/';
    const FIN_URL = 'http://fin:4000/';

    const authStatus = await fetch(AUTH_URL)
    .then(res =>  res.json());

    const finStatus = await fetch(FIN_URL)
    .then(res => res.json());

    // const users = await User.find({email: 'wulzin.t@gmail.com'})
    // console.log(users)

    await sequelize.sync();
    if (finStatus) console.log('Fin server is alive');
    if (authStatus) console.log('Auth server is alive');

    // const transporter = nodemailer.createTransport(sendgrid({
    //   auth: {api_key: API_MAIL}
    // }))
    // transporter.sendMail({
    //   to: 'ryzhov.is@mail.ru',
    //   from: 'MyNotes<info@fraktur.ru>',
    //   subject: 'Тестовое письмо с ноды',
    //   html: '<h1>Привет!</h1><p>Это тестовое письмо с ноды!</p>'
    // })
    res.send('MyNotes API')
  } catch (e) {
    console.log('Error', e)
  }

})

module.exports = router
