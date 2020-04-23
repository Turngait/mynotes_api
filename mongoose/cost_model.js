const {Schema, model} = require('mongoose');
const cost_schema = require('../schemas/cost_schema');

const CostSchema = new Schema(cost_schema);
const cost_model = model('Cost', CostSchema, 'costs');

module.exports = cost_model;
