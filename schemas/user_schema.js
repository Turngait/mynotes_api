const {Types} = require('mongoose')

module.exports = {
    name: String,
    email: String,
    pass: String,
    paper: String,
    wlist: [
        {
            id: Types.ObjectId,
            name: String,
            text: String,
            price: Number,
            spent: Number,
            link: String,
            priority: Number,
            group: String,
            date: String
        }
    ],
    token: String,
    createdAt: String
}