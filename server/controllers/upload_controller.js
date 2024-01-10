const multer = require('multer');
const path = require('path');
const Product = require('../models/productModel');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, '../client/public/uploads')
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage
})

const uploadImages = (req,res)=>{
    res.status(200).json({images: req.files});
    console.log(req.files);
}

// To seed sample products
const addProduct = async(req,res)=>{
    const {title, price, description, image1, image2, category, type, stock, material} = req.body;

    try {
    if(title && price && description && image1 && image2 && category && type && stock && material){
        const productCreated = await Product.create({title, price, description, image1, image2, category, type, stock, material});
        res.send(productCreated);
    }
    else{
        console.log('One or more fields empty');
    }
            
} catch (error) {
        console.log(error);
}
}

module.exports = {uploadImages, upload, addProduct};