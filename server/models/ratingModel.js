const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: false
    }
})

const Rating = new mongoose.model('ratings_reviews',ratingSchema);

module.exports = Rating;