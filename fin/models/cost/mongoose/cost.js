const {Schema, model} = require('mongoose');
const costSchema = require('./schema/cost');

module.exports = model('Cost', new Schema(costSchema), 'costs');
