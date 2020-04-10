const {Schema, model} = require('mongoose')
const wlist_schema = require('../schemas/wlist_schema')

const wlistSchema = new Schema(wlist_schema)
const Wlist = model('Wlist', wlistSchema, 'wlists')
module.exports = Wlist