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

          return {
            name: user.name, 
            email: user.email,
            token
          }
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

  async signUp(data) {
    const paper = crypto.createHash('md5').update(String(Date.now())).digest('hex')
    const pass = createPassword(data.pass, paper)
    const date = new Date().toISOString().slice(0,10)
    const user = new user_model({
      name: data.name,
      email: data.email,
      pass,
      paper,
      wishlist: [],
      createdAt: date
    })

    try {
      await user.save()

      return true
    } catch (e) {
      console.log(e)
      
      return false
    }
  }
}

module.exports = User