const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userModel=require("../model/userModel")

const signupController = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body
        const hashed= await bcrypt.hash(password,10)
        const registered = await userModel.create({ password: hashed , email,name,phone})
        res.status(201).json(registered)
    }
    
    catch (err) {
        console.log(err)
    }
}

const loginController = async (req, res) => {
    try {
        const { phone, password } = req.body
        const user = await userModel.findOne({ phone })
        if (!user) {
            return res.status(404).json("account not found")
        }
        const check = await bcrypt.compare(password, user.password)
        if (!check) {
            return res.status(401).json("password is not correct")
        }

        const token = jwt.sign({
            payload: {
               user_id:user._id
            }
        }, process.env.SECRET, { expiresIn: '10d' })
    console.log(token)
        res.json(token)
    }

    catch (err) {
        console.log(err)
    }
}



const logoutController = async (req, res) => {
    try {
    
    }
    
    catch (err) {
        console.log(err)
    }
}



const getCurrentUserInfo = async (req, res) => {
    try {
        const currentUser = req.user
        res.json(currentUser)
    }
    
    catch (err) {
        console.log(err)
    }
}





module.exports={signupController,loginController,logoutController,getCurrentUserInfo}