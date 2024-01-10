const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

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
                res.status(200).json({ msg: 'user registration successful', token: await userCreated.generateToken() })
            }
        } catch (error) {
            res.status(400).json({ msg: 'user registration unsuccessful', error });
        }
    }
}

const user = async (req, res) => {
    const userData = req.user;
    res.status(200).json({userData});

}

module.exports = { login, register, user };