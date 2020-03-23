const user_model = require('./user_model')
const DAO = require('./dao')
const { createPassword } = require('../config/security')
const crypto = require('crypto')

class User extends DAO {
  constructor(model) {
    super('User')
    this.model = model
  }

  async signIn(data) {
    const user = await this.model.findOne({'email': data.email})

    if (user) {
      const paper = user.paper
      const pass = createPassword(data.pass, paper)

      if (pass == user.pass) {
        const token = crypto.createHash('md5').update(String(Date.now())).digest('hex')
        try {
          await user.updateOne({token})
          const answer = {
            name: user.name, 
            email: user.email,
            token
          }

          return answer
        } catch (e) {
          console.log(e)
          return false
        }
      } else {
        return false
      }
    } else {
      return false
    }
  }
}

module.exports = User