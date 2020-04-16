const {Schema, model} = require('mongoose')
const Wgroup_Schema = require('../schemas/wgroups_schema')

const wgroupSchema = new Schema(Wgroup_Schema)
const Wgroup = model('Wlist_group', wgroupSchema, 'wlist_groups')
module.exports = Wgroup