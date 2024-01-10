const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image1:{
        type: String,
        required: true
    },
    image2:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    stock:{
        type: String,
        required: true
    },
    sizes:{
        type: Array,
        required: true
    },
    colors:{
        type: Array,
        required: true
    }
})

const Product = new mongoose.model('product',productSchema);

module.exports = Product;