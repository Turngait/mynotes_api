const {Schema, model} = require('mongoose');
const budgetSchema = require('./schema/budget');

module.exports = model('Budget', new Schema(budgetSchema), 'budgets');
