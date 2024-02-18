const mongoose = require("mongoose")
const menuModel = require("../model/menuModel")
const orderModel=require("../model/orderModel")
const cloudinary = require("cloudinary").v2
const multer = require('multer');
require("dotenv").config()

cloudinary.config({
    cloud_name: process.env_CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET
})


const addItemToMenu = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        const addedItem = await menuModel.create({ picture: result.secure_url, itemName:req.body.itemName,cookingTime:req.body.cookingTime,price:req.body.price,catagory:req.body.catagory,ingredients:req.body.ingredients})
        res.status(201).json("menu created")
    }
    catch (err) {
        console.log(err)
    }
}

const updateMenuItem = async (req, res) => {
    try {

    }
    catch (err) {
        console.log(err)
    }
}

const deleteItemFromMenu = async (req, res) => {
    try {

    }
    catch (err) {
        console.log(err)
    }
}

const getAllOrder = async (req, res) => {
    try {
        const userPopulated = await orderModel.find().populate("user_id",["name","email","phone"]).sort('')
        res.json(userPopulated)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { addItemToMenu, updateMenuItem, deleteItemFromMenu,getAllOrder }