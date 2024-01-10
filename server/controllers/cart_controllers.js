const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// To get products in cart
const getCart = async(req,res)=>{
    try {
        const userID = req.user._id;
        let cart = await Cart.find({userID});
        res.status(200).json({cart});
    } catch (error) {
        res.status(400).json({error});
    }
}

// To add products in cart
const addToCart = async(req,res)=>{
    const {id} = req.params;
    try {
        let product = await Product.findById(id);
        const userID = req.user._id;
        const cart = await Cart.create({products: product, userID})
        res.status(200).json({cart});
    } catch (error) {
        res.status(400).json({error});
    }
}

// To delete products from cart
const deleteProductFromCart = async(req,res)=>{
        const {id} = req.body;
        try {
            let itemDelete = await Cart.deleteOne({id});
            res.status(200).json({itemDelete});
        } catch (error) {
            res.status(400).json({error});
        }
}

// To update the cart quantity
const updateQuantity = async(req,res)=>{
    let {quantity, id} = req.body;
    try {
        const productIdObject = new ObjectId(id);
        const userID = req.userID;
        const update = await Cart.updateOne({"products._id": productIdObject, userID}, {quantity})
        res.status(200).json({update});
    } catch (error) {
        res.status(400).json({error});
    }
}


// To check whether a product exists in cart or not
const checkInCart = async (req, res) => {
    try {
        const { id } = req.params;
        const productIdObject = new ObjectId(id);
        const userID = req.userID;
        const cartItem = await Cart.findOne({ "products._id": productIdObject, userID });

        if (cartItem) {
            res.status(200).json({ msg: 'Product already exists in cart' });
        } else {
            res.status(200).json({ msg : "Product doesn't exist in cart" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {getCart, addToCart, deleteProductFromCart, updateQuantity, checkInCart}