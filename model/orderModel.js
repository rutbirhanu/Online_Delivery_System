const mongoose = require('mongoose')

const orderModel = mongoose.Schema({
    
    user_id:{
    type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'userModel'
    },
    orderDate:{
        type: Date,
        default:Date.now
    },
    location: {
        type: String,
        // required:[true,"please provide your location"]
    },
    totalPrice: {
        type: Number,
        required:['true',"total price must be calculated"]
    },
    status: {
        type: String,
        default:"Pending"
   },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItemModel',
        required:true
    }]
   
})

module.exports= mongoose.model("orderModel",orderModel)