const {Schema, model} = require('mongoose');
const user_schema = require('./schema/user_schema');

const userSchema = new Schema(user_schema);
module.exports = model('User', userSchema, 'users');
