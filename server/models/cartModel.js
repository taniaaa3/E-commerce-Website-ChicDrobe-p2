const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true
    },
    quantity: {
        type: String,
        required: true,
        default: "1"
    },
    userID: {
        type: String,
        required: true
    }
})

const Cart = new mongoose.model('cart',cartSchema);

module.exports = Cart;