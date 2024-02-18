const mongoose = require('mongoose')

const orderItemModel = mongoose.Schema({

    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"menuModel"
    },

    quantity: {
        type: Number,
    }  
})

module.exports= mongoose.model("orderItemModel",orderItemModel)