const User = require('../models/userModel');
const Address = require('../models/addressModel');

//To edit user details
const editUser = async(req,res)=>{
    const {firstName, lastName, email} = req.body;
    try {
        let update = await User.findOneAndUpdate({email},{firstName, lastName});
        res.status(200).json({update})
    } catch (error) {
        console.log(error);
    }
}

//To save address
const saveAddress = async(req,res)=>{
    const {fullName, phoneNumber, address1, address2, state, city, pincode} = req.body;
    const userID = req.userID;

    try {
        const save = await Address.create({fullName, phoneNumber, address1, address2, state, city, pincode, userID})
        res.status(200).json({save});
    } catch (error) {
        res.status(400).json({error});
    }

}

//To get saved addresses
const getAddress = async(req,res)=>{
    const userID = req.userID;
    try {
        const addresses = await Address.find({userID});
        res.status(200).json({addresses});
    } catch (error) {
        res.status(400).json({error});
    }
}

// To update address
const updateAddress = async(req,res)=>{
    const {_id, fullName, address1, address2, phoneNumber, city, state, pincode} = req.body;
    const userID = req.userID
    try {
        const updated = await Address.findOneAndUpdate({_id},{fullName, phoneNumber, address1, address2, city, state, pincode, userID});
        res.status(200).json({msg: "Address Updated", updated})
    } catch (error) {
        res.status(400).json({error})
    }
}

// To delete address
const deleteAddress = async(req,res)=>{
    const {id} = req.params;
    try {
        const dlt = await Address.findOneAndDelete({_id: id});
        res.status(200).json({dlt});
    } catch (error) {
        res.status(400).json({error});
    }
}

// To get all users : Admin Panel
const allUsers = async(req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json({users});
    } catch (error) {
        res.status(400).json({error});
    }
}

module.exports = {editUser, saveAddress, getAddress, updateAddress, deleteAddress, allUsers}