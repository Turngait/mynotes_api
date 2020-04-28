const {Schema, model} = require('mongoose')
const user_schema = require('../schemas/user_schema')

const userSchema = new Schema(user_schema)
const User = model('User', userSchema, 'users')
module.exports = User
