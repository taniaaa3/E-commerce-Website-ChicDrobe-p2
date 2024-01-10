const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async(req,res,next)=>{
    const token = req.header('Authorization');
    const jwtToken = token.replace('Bearer','').trim();
    const isVerified = jwt.verify(jwtToken,process.env.JWTSECRETKEY);
    try {
        const user = await User.findOne({email: isVerified.email});
        req.user = user;
        req.userID = user._id;
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = authMiddleware