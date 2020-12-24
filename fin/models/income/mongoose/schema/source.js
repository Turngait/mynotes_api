const {Types} = require('mongoose');

module.exports = {
  id_user: String,
  sources: [
    {
      id: Types.ObjectId,
      title: String,
      order: Number
    }
  ]
}