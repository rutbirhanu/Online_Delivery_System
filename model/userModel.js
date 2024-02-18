const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    name: {
        type: String,
        required:[true,"please provide your name"]
    },
    email: {
        type: String,
        required: [true, "please provide your email"],
        unique:[true,"email already exist"]
    },
    phone: {
        type: String,
        required:[true,"please provide your phone number"]
    },
    password: {
        type: String,
        required:[true,"please provide your phone password"]
    },
    role: {
        type: String,
        default:"user"
    }
})

module.exports= mongoose.model("userModel",userModel)