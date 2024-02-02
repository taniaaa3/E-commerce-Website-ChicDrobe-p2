const Product = require('../models/productModel');

// To get all products
const allProducts = async(req,res)=>{
    res.status(200).send(await Product.find());
}

// To get specific product details in product redirect 
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

// To get a specific product for buy now
const getProduct = async(req,res)=>{
    const {id} = req.params;
    try {
        let product = await Product.findById(id);
        res.status(200).json({id, product});
    } catch (error) {
        res.status(400).json({msg : 'cannot find id',error});
    }
}

// To search a product using its name in search bar
const searchProduct = async(req,res)=>{
    const {search} = req.body;
    try {
        let product = await Product.find({"$or":[
            {
                title : {$regex: search,
                        $options: "i"}
            }
        ]});
        if(product){
            res.status(200).json({product});
        }
        else{
            res.status(400).json({msg : 'cannot find product'});
        }
    } catch (error) {
        res.status(400).json({ error});
    }
}

// To update a specific product
const updateProduct = async(req,res)=>{
    const {id} = req.params;
    const {title, price, description, stock} = req.body;
    try {
        const product = await Product.findOneAndUpdate({_id: id},{title, price, description, stock})
        res.status(200).json({msg: "product updated", product});
    } catch (error) {
        res.status(400).json({error});
    }
}

// To delete a product
const deleteProduct = async(req,res)=>{
    const {id} = req.params;
    try {
        const dlt = await Product.findOneAndDelete({_id: id});
        res.status(200).json({msg: "Product Deleted", dlt})
    } catch (error) {
        res.status(400).json({error});
    }
}

// To get distinct product types
const getType = async(req,res)=>{
    let type = await Product.distinct("type");
    res.status(200).json({type})
}

// To get distinct product colors
const getColors = async(req,res)=>{
    let colors = await Product.distinct("colors");
    res.status(200).json({colors})
}

// To get distinct product sizes
const getSizes = async(req,res)=>{
    let sizes = await Product.distinct("sizes");
    res.status(200).json({sizes})
}

// To filter the displayed items
const filterProducts = async(req,res)=>{
    const {type, colors, sizes} = req.body
    try {
        if(type && !colors && !sizes){
        const product = await Product.find({type});
        res.status(200).json({product});
    }
    else if(colors && !type && !sizes){
        const product = await Product.find({colors});
        res.status(200).json({product});
    }
    else if(sizes && !colors && !type){
        const product = await Product.find({sizes});
        res.status(200).json({product});
    }
        else if(type && colors && !sizes){
            const product = await Product.find({type, colors});
        res.status(200).json({product});
        }
        else if(type && sizes && !colors){
            const product = await Product.find({type, sizes});
        res.status(200).json({product});
        }
        else if(!type && colors && sizes){
            const product = await Product.find({colors, sizes});
        res.status(200).json({product});
        }
        else if(type && colors && sizes){
            const product = await Product.find({type, colors, sizes});
        res.status(200).json({product});
        }
    } catch (error) {
        res.status(400).json({error})
    }
}

// To sort the displayed products
const sort = async(req,res)=>{
     const {value, type, colors, sizes} = req.body;
     try {
        if(value == "low2high" && !type && !colors && !sizes){
            const data = await Product.aggregate([
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: 1 } }
              ]).exec();
            res.status(200).json({data});
        }
        else if(value == "low2high" && type && !colors && !sizes){
            const data = await Product.aggregate([
                { $match: { type } },
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: 1 } }
              ]).exec();
            res.status(200).json({data});
        }
        else if(value == "low2high" && !type && colors && !sizes){
            const data = await Product.aggregate([
                { $match: { colors } },
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: 1 } }
              ]).exec();
            res.status(200).json({data});
        }
        else if(value == "low2high" && !type && !colors && sizes){
            const data = await Product.aggregate([
                { $match: { sizes } },
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: 1 } }
              ]).exec();
            res.status(200).json({data});
        }
        else if(value == "low2high" && type && colors && sizes){
            const data = await Product.aggregate([
                { $match: { type, colors, sizes } },
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: 1 } }
              ]).exec();
            res.status(200).json({data});
        }
        else if(value == "low2high" && type && colors && !sizes){
            const data = await Product.aggregate([
                { $match: { type, colors } },
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: 1 } }
              ]).exec();
            res.status(200).json({data});
        }
        else if(value == "low2high" && type && !colors && sizes){
            const data = await Product.aggregate([
                { $match: { type, sizes } },
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: 1 } }
              ]).exec();
            res.status(200).json({data});
        }
        else if(value == "low2high" && !type && colors && sizes){
            const data = await Product.aggregate([
                { $match: { colors, size } },
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: 1 } }
              ]).exec();
            res.status(200).json({data});
        }

        else if(value == "high2low" && !type && !colors && !sizes){
            const data = await Product.aggregate([
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: -1 } }
              ]).exec();
            res.status(200).json({data});
        }
        else if(value == "high2low" && type && !colors && !sizes){
            const data = await Product.aggregate([
                { $match: { type } },
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: -1 } }
              ]).exec();
            res.status(200).json({data});
        }
        else if(value == "high2low" && !type && colors && !sizes){
            const data = await Product.aggregate([
                { $match: { colors } },
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: -1 } }
              ]).exec();
            res.status(200).json({data});
        }
        else if(value == "high2low" && !type && !colors && sizes){
            const data = await Product.aggregate([
                { $match: { sizes } },
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: -1 } }
              ]).exec();
            res.status(200).json({data});
        }
        else if(value == "high2low" && type && colors && sizes){
            const data = await Product.aggregate([
                { $match: { type, colors, sizes } },
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: -1 } }
              ]).exec();
            res.status(200).json({data});
        }
        else if(value == "high2low" && type && colors && !sizes){
            const data = await Product.aggregate([
                { $match: { type, colors } },
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: -1 } }
              ]).exec();
            res.status(200).json({data});
        }
        else if(value == "high2low" && type && !colors && sizes){
            const data = await Product.aggregate([
                { $match: { type, sizes } },
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: -1 } }
              ]).exec();
            res.status(200).json({data});
        }
        else if(value == "high2low" && !type && colors && sizes){
            const data = await Product.aggregate([
                { $match: { colors, sizes } },
                {
                  $addFields: {
                    numericPrice: { $toDouble: "$price" }
                  }
                },
                { $sort: { numericPrice: -1 } }
              ]).exec();
            res.status(200).json({data});
        }
        else{
            res.status(200).json({msg: "No Product Found"})
        }
     } catch (error) {
        res.status(400).json({error});
     }
}


module.exports = {allProducts, sort, productRedirect, getProduct, searchProduct, updateProduct, filterProducts, deleteProduct, getType, getColors, getSizes}