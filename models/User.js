const user_model = require('./user_model');
const DAO = require('./dao');
const { createPassword, createPaper, createToken } = require('../config/security');
const { dateNow } = require('../utils/date');

class User extends DAO {
  constructor(model) {
    super('User');
    this.model = model;
  }

  async signIn(data) {
    const user = await this.checkUserByEmail(data.email);
    if (user) {
      const pass = createPassword(data.pass, user.paper);
      if (pass === user.pass) {
        const token = createToken();
        try {
          await user.updateOne({token});
          return {
            status: 200,
            name: user.name, 
            email: user.email,
            settings: user.settings,
            balance: user.balance,
            token
          };
        } catch (e) {
          console.log(e)
          return {
            status: 503
          };
        }
      } else {
        return {
          status: 403
        };
      }
    } else {
      return {
        status: 403
      };
    }
  }

  async signUp(data) {
    const isUserExist = await this.checkUserByEmail(data.email);
    if (isUserExist) {
      return {
        status: 208
      };
    }
    const paper = createPaper();
    const pass = createPassword(data.pass, paper);
    const date = dateNow();
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
      await user.save();
      return {
        status: 202
      };
    } catch (e) {
      console.log(e);
      return {
        status: 503
      };
    }
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

  async getUserInfo(token) {
    const user = await this.getUserByToken(token);
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
    const user = await this.getUserByToken(token);
    if(user) {
      user.name = data.name;
      user.email = data.email;
      // TODO Add try-catch 
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
