const mongoose = require('mongoose')
const {urlLocal} = require('../config/mongo')


class DAO {
  constructor(collection) {
    this.collection = collection
    this.response = {}
  }

  async connectToMongo() {
    await mongoose.connect(urlLocal, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('successfully connected to the database');
    }).catch(err => {
      console.log(err)
      console.log('error connecting to the database');
    })
  }

  add() {

  }

  update() {

  }

  delete() {

  }

  getById() {

  }

  getAll() {

  }
}


module.exports = DAO
