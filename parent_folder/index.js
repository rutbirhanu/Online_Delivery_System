const express = require("express")
const connectDB = require("./config/dbConfig")
const dotenv = require("dotenv").config()
const router=require("./route/indexRoute")
const app = express()


app.use(express.json())
app.use("/cocoon",router)


port=process.env.PORT || 4500
connectDB()
app.listen(port, () => {
    console.log("server is up and running")
})

