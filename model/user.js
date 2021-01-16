const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

function hashPassword(value) {
    return bcrypt.hashSync(value, 10)
}

const schema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: hashPassword
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model("user", schema)