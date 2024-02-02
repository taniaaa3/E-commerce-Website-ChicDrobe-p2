const User = require('../models/userModel');

// to delete user
const delUser = async(req,res)=>{
    const {id} = req.params;
    try {
        const del = await User.deleteOne({_id: id});
        res.status(200).json({del})
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports = {delUser};