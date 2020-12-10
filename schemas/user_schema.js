const {Types} = require('mongoose')

module.exports = {
    name: String,
    email: String,
    pass: String,
    paper: String,
    balance: Number,
    settings: {
        local: String,
        currency: String
    },
    token: String,
    createdAt: String
}