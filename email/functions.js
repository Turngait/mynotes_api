const {EMAIL_FROM, APP_NAME} = require('../config/api');
const {signUpText, recoveryText} = require('./texts');

module.exports = { 
  signUpMail: (data)  => {
    return {
      to: data.email,
      from: EMAIL_FROM,
      subject: 'Регистрация на сайте ' + APP_NAME,
      html: signUpText(data)
    }
  },
  sendRecoveryMessage: (data) => {
    return {
      to: data.email,
      from: EMAIL_FROM,
      subject: 'Восстановление пароля на сайте ' + APP_NAME,
      html: recoveryText(data)
    }
  }
}