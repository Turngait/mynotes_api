const Sequelizer = require('sequelize')
const sequelize = require('../mysql/index')

const test =sequelize.define('Test', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelizer.INTEGER
  },
  name: {
    type: Sequelizer.STRING,
    allowNull: false
  }
})

module.exports = test
