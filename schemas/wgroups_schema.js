const {Types} = require('mongoose')

module.exports = {
  id_user: String,
  groups: [
    {
      title: String,
      id: Types.ObjectId
    }
  ]
}