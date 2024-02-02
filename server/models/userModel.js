const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWTSECRETKEY = process.env.JWTSECRETKEY;

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

//Crypting the password before creating a user;
userSchema.pre('save',async function(next){
    const user = this;
    try {
        const password = await bcrypt.hash(user.password,10);
        user.password = password;
    } catch (error) {
        next(error);
    }
})

//Generating JSONWebToken;
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            id: this._id.toString(),
            email: this.email
        },
        JWTSECRETKEY,
        {
            expiresIn: '30d'
        })
    } catch (error) {
        console.log(error);
    }
}

// Password compare at time of login
userSchema.methods.comparePassword = async function(password){
    try {
        return bcrypt.compare(password,this.password);
    } catch (error) {
        console.log(error);
    }
}

// Password reset
userSchema.methods.resetPassword = async function(password){
    try {
        const newPassword = await bcrypt.hash(password,10);
        return newPassword;
    } catch (error) {
        console.log(error);
    }
}

const User = new mongoose.model('User',userSchema);

module.exports = User;