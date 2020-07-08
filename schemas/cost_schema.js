const {Types} = require('mongoose');


module.exports = {
  id_user: String,
  items: [
    {
      id: Types.ObjectId,
      title: String,
      descrition: String,
      amount: Number,
      id_group: String,
      id_wlist_item: String,
      period: String,
      date: String
    }
  ],
  createdAt: String
}