const user_model = require('./user_model');
const DAO = require('./dao');
const { createPassword, createPaper, createToken } = require('../config/security');

class User extends DAO {
  constructor(model) {
    super('User');
    this.model = model;
  }


  async checkUserByEmail(email) {
    const user = await this.model.findOne({'email': email});
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  async getUserByToken (token) {
    return await this.model.findOne({token});
  }

  async getUserId (token) {
    const candidate = await this.getUserByToken(token);
    return candidate._id;
  }


  async changePassword(data, token) {
    const user = await this.getUserByToken(token);
    if (user) {
      const pass = createPassword(data.old, user.paper);
      if (pass === user.pass) {
        const newPass = createPassword(data.new, user.paper);
        user.pass = newPass;
        // TODO Add try-catch 
        if(user.save()) {
          return 204;
        } else {
          return 500;
        }
      } else {
        return 403;
      }
    } else {
      return 403;
    }
  }

  async setNewPassByEmail(pass, email) {
    const user = await this.checkUserByEmail(email);
    if(user) {
      const newPass = createPassword(pass, user.paper);
      user.pass = newPass;
  
      if(user.save()) {
        return 204;
      } else {
        return 500;
      }
    } else {
      return 403;
    }
  }
}

module.exports = User;
