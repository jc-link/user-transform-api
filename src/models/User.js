// filepath: /C:/Users/Usuario/Documents/projects/user-transform-api/src/models/User.js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    rut: {
        type: String,
        required: true,
        unique: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User