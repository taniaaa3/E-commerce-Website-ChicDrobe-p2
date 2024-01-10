const Contact = require('../models/contactModel');

const contactController = async(req, res)=>{
    const {name, email, message} = req.body;
    if(name && email && message){
    try {
        const sendMessage = await Contact.create({name, email, message});
        res.status(200).json({msg: 'Message sent', sendMessage})
    } catch (error) {
        console.log(error);
    }}
    else{
        console.log('One or more fields empty');
    }
}

module.exports = contactController