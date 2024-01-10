const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
})

const Wishlist = new mongoose.model('wishlist',wishlistSchema);

module.exports = Wishlist;