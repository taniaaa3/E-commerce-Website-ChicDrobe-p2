const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    address:{
        type: Object,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    paymentMethod:{
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Active"
    }
})

const Order = new mongoose.model('order',orderSchema);

module.exports = Order;