const user_model = require('../models/user_model')
const User = require('../models/User')
const DTO = require('../models/dto')

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

  static async signUp(req, res) {
    const response = new DTO()
    const user = new User(user_model)
    try {
      const answer = await user.signUp(req.body)
      if (answer) {
        res.status(202)
        response.setStatus(202)
        response.setStatusText('User created')
        response.setData({})
      } else {
        res.status(500)
        response.setStatus(500)
        response.setStatusText('Server error')
        response.setData({})
      }
      res.json(response.getResponse())
    } catch(e) {
      res.status(503)
      response.setStatus(503)
      response.setStatusText('Server error')
      res.json(response.getResponse())
    }
  }
}

module.exports = AuthController