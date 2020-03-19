const crypto = require('crypto')

const DAO = require('./dao')

class User extends DAO {
  constructor(email) {
    super('users')
    this.email = email
  }

  signIn(pass) {

  }

  signUp(pass) {

  }

  fakeSignIn(pass) {
    if (this.email == "wulzin.t@gmail.com" && pass == '123') {
      const word = 'fake sign in';
      return crypto.createHash('md5').update(word).digest('hex')
    } else {
      return false
    }

  }
}

module.exports = User
