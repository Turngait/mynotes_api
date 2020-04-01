const Sequelize = require('sequelize')
const { config } = require('../config/mysql')

const sequelize = new Sequelize(config.db_name, config.user, config.pass, {
  host: config.host,
  dialect: 'mysql'
})

module.exports = sequelize
