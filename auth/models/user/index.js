const userModel = require('./mongoose');

const { createPassword, createPaper, createToken } = require('../../config/security');
const { dateNow } = require('../../utils/date');

class User {
  
  static async signIn(email, pass) {
    let data = null;

    const user = await this.getUserByEmail(email);
    const password = createPassword(pass, user.paper);
  
    if (password === user.pass) {
      const token = createToken();
      try {
        await user.updateOne({token});
        data = {
          user: {
            name: user.name, 
            email: user.email,
            settings: user.settings,
            balance: user.balance,
            token
          },
          status: 200,
        }
      } catch (e) {
        console.log(e)
        data = {status: 503};
      }
    } else {
      data = {status: 403};
    }
    return data;
  }

  static async signUp(data) {
    const isUserExist = await User.getUserByEmail(data.email);
    if (isUserExist) {
      return {
        status: 208
      };
    }
    const paper = createPaper();
    const pass = createPassword(data.pass, paper);
    const date = dateNow();

    const user = new userModel({
      name: data.name,
      email: data.email,
      pass,
      paper,
      balance: 0,
      settings: {
        local: 'ru',
        currency: 'Руб'
      },
      wlist: [],
      createdAt: date
    });

    try {
      const userData = await user.save();
      return {
        status: 202,
        userData
      };
    } catch (e) {
      console.log(e);
      return {
        status: 503
      };
    }
  }

  static async getPublicData(id) {
    const user = await User.getUserById(id);
    if (user) {
      return {
        email: user.email,
        name: user.name,
        balance: user.balance,
        id: user._id
      };
    } else {
      return null;
    }
  }

  static async changeUserData(data, id) {
    const user = await User.getUserById(id);
    if (user) {
      user.email = data.email;
      user.name = data.name;
      try {
        user.save();
        return 204;
      } catch(error) {
        console.log(error);
        return 500;
      }
    } else {
      return 403;
    }
  }

  static async changeUserPassword(oldPass, newPass, id) {
    const user = await User.getUserById(id);
    const pass = createPassword(oldPass, user.paper);
    if(pass === user.pass) {
      const createdNewPass = createPassword(newPass, user.paper);
      user.pass = createdNewPass;
      try {
        user.save();
        return 204;
      } catch(error) {
        console.log(error);
        return 500;
      }
    } else {
      return 403;
    }
  }

  static async setPasswordInRecovery(pass, id) {
    const user = await User.getUserById(id);

    if(user) {
      const newPass = createPassword(pass, user.paper);
      user.pass = newPass;
  
      try {
        user.save();
        return 204;
      } catch(error) {
        console.log(error);
        return 500;
      }
    } else {
      return 403;
    }
  }

  static async getUserByEmail(email) {
    try {
      return await userModel.findOne({email});
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserIdByToken(token) {
    try {
      const user = await userModel.findOne({token});
      if(user) return user._id;
      
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserById(id) {
    try {
      return await userModel.findOne({_id: id});
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;