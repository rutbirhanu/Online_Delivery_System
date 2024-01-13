const mongoose = require('mongoose')

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGOCONNECTION)
        console.log("connected to db")
    }
    catch (err) {
        console.log(err)
    }
}

module.exports=connectDB