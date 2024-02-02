const User = require('../models/userModel');
const nodemailer = require('nodemailer');

const login = async (req, res) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (email && password) {
        try {
            if (userExists) {
                let passCompare = await userExists.comparePassword(password);
                if (passCompare) {
                    res.status(200).json({ msg: 'user login successful', token: await userExists.generateToken() });
                }
                else {
                    res.status(400).json({ msg: 'Invalid credentials' });
                }
            }
            else {
                res.status(400).json({ msg: 'please register first' });
            }
        } catch (error) {
            res.status(400).json({ msg: 'one or more fields empty ', error });
        }
    }
}
const register = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    let userExists = await User.findOne({ email });

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
        res.status(400).json({ msg: 'one or more fields empty' });
    }
    else {
        try {
            if (userExists) {
                res.status(400).json({ msg: 'user already exists' });
            }
            else {
                const userCreated = await User.create({ firstName, lastName, email, phoneNumber, password });
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "chicdrobeofficial@gmail.com",
                        pass: "qgyn khwn vkre afdm",
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                })
                transporter.sendMail({
                    from: "'ChicDrobe' <chicdrobeofficial@gmail.com>",
                    to: email,
                    subject: "Registration successful",
                    html: `<h1>Welcome to ChicDrobe, ${firstName}. Your registration has been successful.</h1>`
                }, (error, info) => {
                    if (error) {
                        console.error('Error:', error.message);
                    } else {
                        console.log('Email sent:', info.response);
                    }
                })
                res.status(200).json({ msg: 'user registration successful', token: await userCreated.generateToken() })
            }
        } catch (error) {
            res.status(400).json({ msg: 'user registration unsuccessful', error });
        }
    }
}
const user = async (req, res) => {
    const userData = req.user;
    res.status(200).json({ userData });

}

const send = async (req, res) => {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    const otp = Math.floor(1000 + Math.random() * 9000);
    if (userExists) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "chicdrobeofficial@gmail.com",
                pass: "qgyn khwn vkre afdm",
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        transporter.sendMail({
            from: "'ChicDrobe' <chicdrobeofficial@gmail.com>",
            to: email,
            subject: "Password reset",
            text: `${otp} is your ChicDrobe Verification OTP. This otp will be valid for only 5 minutes on the device you tried to reset password from.`
        }, (error, info) => {
            if (error) {
                res.status(400).json({ error});
            } else {
                res.status(200).json({otp, info});
            }
        })
    }
    else{
        res.status(400).json({msg: "user doesn't exist"})
    }
}
const resetPassword = async(req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        const newPass = await user.resetPassword(password);
        const passUpdate = await User.findOneAndUpdate({email},{password: newPass});
        res.status(200).json({passUpdate})
    } catch (error) {
        res.status(400).json({error: "error here"});
    }
}

const verifyEmail = async(req,res)=>{
    const {email} = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "chicdrobeofficial@gmail.com",
                pass: "qgyn khwn vkre afdm",
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        transporter.sendMail({
            from: "'ChicDrobe' <chicdrobeofficial@gmail.com>",
            to: email,
            subject: "Email Verification",
            text: `${otp} is your ChicDrobe Email Verification OTP. This otp will be valid for only 5 minutes on the device you tried to reset password from.`
        }, (error, info) => {
            if (error) {
                res.status(400).json({ error});
            } else {
                res.status(200).json({otp, info});
            }
        })
    } catch (error) {
        res.status(400).json({error});
    }
}
const userExist = async(req,res)=>{
    const {email} = req.body
    try {
        const exists = await User.findOne({email});
        if(!exists){
            res.status(200).json({msg: "User doesn't exist"});
        }
        else{
            res.status(200).json({msg: "User already exists"})
        }
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports = { login, register, user, send, resetPassword, verifyEmail, userExist };