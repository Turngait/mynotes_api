const {Schema, model} = require('mongoose');
const costGroup_schema = require('../schemas/costGroup_schema');

const costGroupSchema = new Schema(costGroup_schema);
const CostGroup = model('Cost_group', costGroupSchema, 'cost_groups');
module.exports = CostGroup;