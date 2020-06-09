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
      if (answer === 'User exist') {
        response.setStatus(208)
        response.setStatusText('User exist')
        response.setData({})
      } else if (answer) {
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

  static async getUserData(req, res) {
    const {token} = req.params;
    const response = new DTO();
    const user = new User(user_model);
    const info = await user.getuserInfo(token);

    if (info) {
      res.status(200)
      response.setData(info)
      response.setStatus(200)
      res.json(response.getResponse())
    } else {
      res.status(403)
      response.setStatus(403)
      res.json(response.getResponse())
    }
  }
}

module.exports = AuthController