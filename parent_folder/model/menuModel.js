const mongoose = require('mongoose')

const menuModel = mongoose.Schema({
    itemName: {
        type: String,
        required: [true, "please provide the name of the item"]
    },
    cookingTime: {
        type: String,
    },
    price: {
        type: String,
        required:[true,"please provide the price"]
    },
    catagory: {
        type:String
    },
    ingredients: {
        type:String
    },
    picture: {
        type: String,
    }
})

module.exports = mongoose.model("menuModel", menuModel)