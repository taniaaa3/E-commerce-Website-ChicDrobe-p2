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
    const [toggle, setToggle] = useState(false);
    const [otp, setOtp] = useState(localStorage.getItem("OTP"));
    const [userOtp, setUserOtp] = useState();
    const { storeToken, token } = useAuth();
    const navigate = useNavigate();
    const [registerLoading, setRegisterLoading] = useState(false);
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
    const emailVerification = async (e) => {
        e.preventDefault();
        const { email } = userData;
        try {
            await axios.post("https://chicdrobe.onrender.com/auth/userexist", { email }).then((res) => {
                if (res.data.msg == "User doesn't exist") {
                    axios.post("https://chicdrobe.onrender.com/auth/verifymail", { email }).then((res) => {
                        console.log(res);
                        localStorage.setItem("OTP",res.data.otp);
                    setOtp(res.data.otp);
                        setTimeout(() => {
                            setOtp(null);
                            localStorage.removeItem("OTP");
                        }, 300000)
                        setToggle(true);
                    }).catch((err) => {
                        console.log(err);
                    })
                }
                else if (res.data.msg == "User already exists") {
                    toast.error("User already exists")
                }
                else{
                    alert(res.data.msg)
                }
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const otpVerification = async (e) => {
        e.preventDefault();
        if (userOtp == otp) {
            registerUser();
        }
        else {
            toast.error("INVALID OTP");
        }
    }
    const registerUser = async () => {
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
                setRegisterLoading(true);
                await axios.post('https://chicdrobe.onrender.com/auth/register', userData).then((res) => {
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
                    setRegisterLoading(false);
                    navigate('/')
                }).catch((error) => {
                    console.log(error);
                    warn(error.response.data.msg);
                    setRegisterLoading(false);
                })
            }
            catch (err) {
                console.log(err);
            }
        }
    }



    return (
        <div className="home md:h-[550px] h-[600px]">
            <div className="login w-full h-full flex flex-col justify-center items-center">
                {toggle ?
                    <form onSubmit={otpVerification} className="form px-5 py-7 rounded-lg flex flex-col justify-center items-left">
                        <h1 className="self-center mb-5 text-2xl font-bold">Verify Email</h1>
                        <label htmlhtmlFor="otp" className="pl-2 font-medium">Enter OTP</label>
                        <input type="number" className="m-2 px-3 py-1" placeholder="Enter Your OTP" id="otp" onChange={(e) => { setUserOtp(e.target.value) }} required name='otp' />
                        <button className=" self-center m-3 px-3 py-1 text-xl font-semibold rounded-lg" type='submit'>Verify</button>
                        <p className='text-sm '>*OTP IS VALID FOR ONLY 5 MINUTES*</p>
                    </form>
                    :
                    <form onSubmit={emailVerification} className="form w-3/4 sm:w-1/2 md:w-1/3 px-5 py-5 rounded-lg flex flex-col justify-center items-left">
                        <h1 className="self-center m-2 text-2xl font-bold">Register</h1>
                        <label htmlhtmlFor="firstName" className="pl-2 font-medium">First Name</label>
                        <input name="firstName" className="m-2 px-3 py-1" placeholder="Enter Your First Name" type="text" onChange={(e) => { handleChange(e) }} required value={userData.firstName} />
                        <label htmlhtmlFor="lastName" className="pl-2 font-medium">Last Name</label>
                        <input name="lastName" className="m-2 px-3 py-1" placeholder="Enter Your Last Name" type="text" onChange={(e) => { handleChange(e) }} required value={userData.lastName} />
                        <label htmlhtmlFor="email" className="pl-2 font-medium">Email:</label>
                        <input name="email" className="m-2 px-3 py-1" placeholder="Enter Your Email" type="email" onChange={(e) => { handleChange(e) }} required value={userData.email} />
                        <label htmlhtmlFor="phoneNumber" className="pl-2 font-medium">Phone Number</label>
                        <input name="phoneNumber" className="m-2 px-3 py-1" placeholder="Enter Your Phone Number" type="number" onChange={(e) => { handleChange(e) }} required value={userData.phoneNumber} />
                        <label htmlhtmlFor="pass" className="pl-2 font-medium">Password:</label>
                        <input id="pass" name="password" className="m-2 px-3 py-1" placeholder="Enter Your Password" type="password" onChange={(e) => { handleChange(e) }} required value={userData.password} />
                        <button className=" self-center m-3 px-3 py-1 text-xl font-semibold rounded-lg" type='submit'>{registerLoading ? "Registering..." : "Register"}</button>
                    </form>}
            </div>
        </div>
    )
}

export default Register
