const Product = require('../models/productModel');
const Wishlist = require('../models/wishlistModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

// To add item into wishlist
const addWishlist = async(req,res)=>{
    const {id} = req.params;
    try {
        let product = await Product.findById(id);
        const userID = req.user._id;
        const addToWishlist = await Wishlist.create({products: product, userID})
        res.status(200).json({addToWishlist, msg: 'done'});
    } catch (error) {
        res.status(400).json({error})
    }
} 

// To remove item from wishlist
const removeWishlist = async(req,res)=>{
    const {id} = req.body;
    try {
        const deleteFromWishlist = await Wishlist.deleteOne({id})
        res.status(200).json({deleteFromWishlist});
    } catch (error) {
        res.status(400).json({error})
    }
}

// To get wishlist
const getWishlist = async(req,res)=>{
    try {
        const userID = req.user._id;
        let wishlist = await Wishlist.find({userID});
        res.status(200).json({wishlist});
    } catch (error) {
        res.status(400).json({error});
    }
}

// To check whether product exists in wishlist
const checkWishlist = async(req,res)=>{
    try {
        const { id } = req.params;
        const productIdObject = new ObjectId(id);
        const wishlistItem = await Wishlist.findOne({ "products._id": productIdObject });

        if (wishlistItem) {
            res.status(200).json({ msg: 'Product already exists in wishlist' });
        } else {
            res.status(200).json({ msg : "Product doesn't exist in wishlist" });
        }
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports = {addWishlist, removeWishlist, getWishlist, checkWishlist};