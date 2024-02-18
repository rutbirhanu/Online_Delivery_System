const mongoose = require("mongoose")
const menuModel = require("../model/menuModel")


const getAllMenu = async (req, res) => {
    try {
        const menuItems = await menuModel.find()
        res.json(menuItems)
    }
    catch (err) {
        console.log(err)
    }
}

const getSingleItem = async (req, res) => {
    try {
        const id = req.params.itemId
        const item=await menuModel.findById({_id:id})
        res.json(item)
    }
    catch (err) {
        console.log(err)
    }
}

const searchItem = async(req,res) => {
    try {
        
    }
    catch (err) {
        
    }
}

const filterItems = async (req, res) => {
    try {
        
    }
    catch (err) {
        
    }
}


module.exports={getAllMenu,getSingleItem, searchItem,filterItems}