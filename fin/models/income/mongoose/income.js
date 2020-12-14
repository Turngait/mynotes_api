const {Schema, model} = require('mongoose');
const income_schema = require('./schema/income');

const Income_Schema = new Schema(income_schema);
const income_model = model('Income', Income_Schema, 'incomes');

module.exports = income_model;