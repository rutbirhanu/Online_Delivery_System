const mongoose = require("mongoose")
const orderModel = require("../model/orderModel")
const menuModel = require("../model/menuModel")
const orderItemModel = require("../model/orderItems")
const axios = require('axios');
const userModel = require("../model/userModel");


const addToCart = async (req, res) => {
    try {
        const { location, orderItems } = req.body;
        const {user_id}=req.user

        const orderItemList = await Promise.all(orderItems.map(async items => {
            let newOrderItems = new orderItemModel({ item_id: items.item_id, quantity: items.quantity });
            newOrderItems = await newOrderItems.save();
            return newOrderItems._id;
        }));

        // Extract item_ids from orderItems
        const itemIds = orderItemList.map(item => item.item_id);

        // Retrieve prices for all items at once
        const itemPrices = await menuModel.find({ _id: { $in: itemIds } }).select('price');
        const priceMap = new Map(itemPrices.map(item => [item._id.toString(), item.price]));

        // Calculate total price
        const totalprice = orderItems.reduce((total, item) => {
            const itemPrice = priceMap.get(item.item_id);
            return total + item.quantity * itemPrice;
        }, 0);

        const order = await orderModel.create({
            user_id: user_id,
            orderItems: orderItemList,
            totalPrice: totalprice,
            location: location,
        });

        res.status(201).json(order);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const placeOrder = async (req, res) => {
    try {
        const { orderId } = req.params
        const order = await orderModel.findById(orderId)
        if (!order) {
            return res.status(404).json("this order doesn't exits")
        }
        order.paymentMethod = "gateway"
        await order.save()
        const user = await userModel.findById(order.user_id)
        const firstName = user.name.split(" ")[0]
        const lastName = user.name.split(" ")[1]
        const TEXT_REF = "tx-myecommerce12345-" + Date.now()
            const config = {
                headers: {
                    Authorization: `Bearer ${process.env.SECRET_KEY}`
                }
            }
            const data = {
                amount: order.totalPrice,
                currency: "ETB",
                email: user.email,
                first_name: firstName,
                last_name: lastName,
                phone_number: "0968581847",
                tx_ref: TEXT_REF,
                callback_url: "http://localhost:4400/api/verify-payment/" + TEXT_REF,
                return_url: "http://localhost:4400/api/payment-success/"
            }
          
            await axios.post("https://api.chapa.co/v1/transaction/initialize",data,config)
            .then((response) => {
                res.redirect(response.data.data.checkout_url)
            })
            .catch((err) => console.log(err))

    }
    catch (err) {
        console.log(err)
    }
}


const userCartItems = async (req, res) => {
    try {
        const { userid } = req.params
        const cartItems = await orderModel.find({ user_id: userid }).populate({ path: 'orderItems', populate: 'item_id' }).sort('orderDate')
        res.json(cartItems)

    }
    catch (err) {
        console.log(err)
    }
}


module.exports = { userCartItems, addToCart, placeOrder }


