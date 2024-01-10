const Product = require('../models/productModel');

const allProducts = async(req,res)=>{
    res.status(200).send(await Product.find());
}

const productRedirect = async(req,res)=>{
    // const {curID} = req.body;
    const {id} = req.params;
    try {
        let product = await Product.findById(id);
        res.status(200).json({id, product});
    } catch (error) {
        res.status(400).json({msg : 'cannot find id',error});
    }
}


module.exports = {allProducts, productRedirect}