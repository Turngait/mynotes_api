const {Types} = require('mongoose');

module.exports = {
  id_user: String,
  groups: [
    {
      id: Types.ObjectId,
      title: String,
    }
  ]
}