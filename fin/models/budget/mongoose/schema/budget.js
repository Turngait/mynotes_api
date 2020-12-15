const {Types} = require('mongoose');

module.exports = {
  id_user: String,
  balance: Number,
  items: [
    {
      id: Types.ObjectId,
      title: String,
      balance: Number,
      created_at: String
    }
  ]
}