const crypto = require('crypto')
const user_model = require('../models/user_model')
const User = require('../models/User')
const DTO = require('../models/dto')
const {createPassword} = require('../config/security')

class AuthController {
  constructor() {

  }

  static async signIn (req, res) {
    const user = new User(user_model)
    const answer = await user.signIn(req.body)
    const response = new DTO()
    if(answer) {
      res.status(200)
      response.setData(answer)
      response.setStatus(200)
      res.json(response.getResponse())
    } else {
      res.status(403)
      response.setData({'token': false})
      response.setStatus(403)
      res.json(response.getResponse())
    }
  }

  signUp(req, res) {

  }
}

module.exports = AuthController