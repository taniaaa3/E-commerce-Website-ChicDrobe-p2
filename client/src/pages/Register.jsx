import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
    });
    const { storeToken, token } = useAuth();
    const navigate = useNavigate();
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }
    const notify = (message) => {
        toast(message, {
            icon: "🚀"
        })
    }

    const warn = (message) => {
        toast.error(message);
    }
    const registerUser = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, phoneNumber, password } = userData;
        if (firstName.length < 3 || lastName.length < 3) {
            warn('Enter a valid first & last name');
        }
        else if (phoneNumber.length != 10) {
            warn('Phone Number should be valid');
        }
        else if (password.length < 6) {
            warn('Password must be of at least 6 characters')
        }
        else {
            try {
                await axios.post('http://localhost:3003/auth/register', userData).then((res) => {
                    setUserData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: '',
                        password: ''
                    })
                    console.log(res);
                    storeToken(res.data.token);
                    notify('user registration successful');
                    navigate('/')
                }).catch((error) => {
                    console.log(error);
                    warn(error.response.data.msg);
                })
            }
            catch (err){
                console.log(err);
            }
        }}
    
    
    return (
        <div className="home md:h-[550px] h-[600px]">
            <div className="login w-full h-full flex flex-col justify-center items-center">
                <form onSubmit={registerUser} className="form w-1/2 sm:w-1/2 md:w-1/3 px-5 py-5 rounded-lg flex flex-col justify-center items-left">
                    <h1 className="self-center m-2 text-2xl font-bold">Register</h1>
                    <label htmlFor="firstName" className="pl-2 font-medium">First Name</label>
                    <input name="firstName" className="m-2 px-3 py-1" placeholder="Enter Your First Name" type="text" onChange={(e) => { handleChange(e) }} required value={userData.firstName} />
                    <label htmlFor="lastName" className="pl-2 font-medium">Last Name</label>
                    <input name="lastName" className="m-2 px-3 py-1" placeholder="Enter Your Last Name" type="text" onChange={(e) => { handleChange(e) }} required value={userData.lastName} />
                    <label htmlFor="email" className="pl-2 font-medium">Email:</label>
                    <input name="email" className="m-2 px-3 py-1" placeholder="Enter Your Email" type="email" onChange={(e) => { handleChange(e) }} required value={userData.email} />
                    <label htmlFor="phoneNumber" className="pl-2 font-medium">Phone Number</label>
                    <input name="phoneNumber" className="m-2 px-3 py-1" placeholder="Enter Your Phone Number" type="number" onChange={(e) => { handleChange(e) }} required value={userData.phoneNumber} />
                    <label htmlFor="pass" className="pl-2 font-medium">Password:</label>
                    <input id="pass" name="password" className="m-2 px-3 py-1" placeholder="Enter Your Password" type="password" onChange={(e) => { handleChange(e) }} required value={userData.password} />
                    <button className=" self-center m-3 px-3 py-1 text-xl font-semibold rounded-lg" type='submit'>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register