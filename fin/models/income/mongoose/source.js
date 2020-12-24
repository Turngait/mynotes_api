const {Schema, model} = require('mongoose');
const source_schema = require('./schema/source');

const Source_Schema = new Schema(source_schema);
const Source_model = model('Income_source', Source_Schema, 'income_sources');

module.exports = Source_model;