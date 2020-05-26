const {Types} = require('mongoose');

module.exports = {
  id_user: String,
  items: [
    {
      id: Types.ObjectId,
      title: String,
      text: String,
      period: String,
      amount: Number,
      date: String
    }
  ],
  createdAt: String
};
