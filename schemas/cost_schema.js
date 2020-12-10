const {Types} = require('mongoose');


module.exports = {
  id_user: String,
  items: [
    {
      period: String,
      id: Types.ObjectId,
      title: String,
      descrition: String,
      amount: Number,
      id_group: String,
      period: String,
      date: String
    }
  ],
  createdAt: String
}