const Rating = require('../models/ratingModel');

// update rating 
const updateRating = async(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    
    
}

module.exports = {updateRating}