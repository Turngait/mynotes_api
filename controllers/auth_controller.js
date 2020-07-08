const user_model = require('../models/user_model');
const User = require('../models/User');
const DTO = require('../models/dto');
const {API_MAIL} = require('../config/api');
const sendgrid = require('nodemailer-sendgrid-transport');
const nodemailer = require('nodemailer');
const {signUpMail, sendRecoveryMessage} = require('../email/functions');
const {createHashForRecovery} = require('../config/security');

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

        const transporter = nodemailer.createTransport(sendgrid({
          auth: {api_key: API_MAIL}
        }));

        transporter.sendMail(signUpMail({email: req.body.email, password: req.body.pass}));

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

  static async saveNewUserData(req, res) {
    const response = new DTO();
    const user = new User(user_model);

    const data = {
      name: req.body.name,
      email: req.body.email
    };
    const {token} = req.body;

    const answer = await user.saveNewUserInfo(data, token);

    if (answer === 204) {
      res.status(204)
      response.setStatus(204)
      res.json(response.getResponse())
    } else if (answer === 403) {
      res.status(403)
      response.setStatus(403)
      res.json(response.getResponse())
    } else {
      res.status(503)
      response.setStatus(503)
      response.setStatusText('Server error')
      res.json(response.getResponse())
    }

  }

  static async changeNewPassword(req, res) {
    const response = new DTO();
    const user = new User(user_model);

    const answer = await user.changePassword(req.body.pass, req.body.token);

    if(answer === 500) response.setStatusText('Server error');

    res.status(answer);
    response.setStatus(answer);
    res.json(response.getResponse());
  }

  static async sendRecoveryMessage(req, res) {
    const {email} = req.body;
    const hash = createHashForRecovery(email);
    const link = `/setnewpass/${email}/${hash}`;

    const transporter = nodemailer.createTransport(sendgrid({
      auth: {api_key: API_MAIL}
    }));

    if(transporter.sendMail(sendRecoveryMessage({email, link}))) {
      res.json({send: true})
    } else {
      res.json({send: false})
    }
  }
  
  static async setNewPass(req, res) {
    const user = new User(user_model);
    const {email, hash, pass} = req.body;
    const secHash = createHashForRecovery(email);
    if (secHash === hash) {
      const answer = await user.setNewPassByEmail(pass, email);

      if (answer == 204) {
        res.status(204)
        res.json({isChange: true});
      } else {
        res.status(500)
        res.json({isChange: false});
      }
    }
  }
}

module.exports = AuthController