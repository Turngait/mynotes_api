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
            settings: user.settings,
            balance: user.balance,
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
    const isUserExist = await this.checkUserByEmail(data.email);
    if (isUserExist) {
      return 'User exist'
    }

    const paper = crypto.createHash('md5').update(String(Date.now())).digest('hex')
    const pass = createPassword(data.pass, paper)
    const date = new Date().toISOString().slice(0,10)
    const user = new user_model({
      name: data.name,
      email: data.email,
      pass,
      paper,
      balance: 0,
      settings: {
        local: 'ru',
        currency: 'RUR'
      },
      wlist: [],
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

  async checkUserByEmail(email) {
    const user = await this.model.findOne({'email': email})
    if (user) {
      return true
    } else {
      return false
    }
  }

  async getUser (token) {
    return await this.model.findOne({token})
  }

  async getUserId (token) {
    const candidate = await this.model.findOne({token})
    return candidate._id
  }

  async getuserInfo(token) {
    const user = await this.model.findOne({token})
    if (user) {
      
      return {
        email: user.email,
        name: user.name,
        balance: user.balance
      };
    } else {
      return null;
    }
  }

  async saveNewUserInfo(data, token) {
    const user = await this.model.findOne({token});
    if(user) {
      user.name = data.name;
      user.email = data.email;

      if(user.save()) {
        return 204;
      } else {
        return 500;
      }
    } else {
      return 403;
    }
  }

  async changePassword(data, token) {
    const user = await this.model.findOne({token});
    if (user) {
      const pass = createPassword(data.old, user.paper);
      if (pass === user.pass) {
        const newPass = createPassword(data.new, user.paper);
        user.pass = newPass;
  
        if(user.save()) {
          return 204;
        } else {
          return 500;
        }
      } else {
        return 403;
      }
    } else {
      return 401;
    }
  }
}

module.exports = User