import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState();
    const [otp, setOtp] = useState(localStorage.getItem('OTP'));
    const [toggle, setToggle] = useState(false);
    const [userOtp, setUserOtp] = useState();
    const [verified, setVerified] = useState(false);
    const [newPass, setNewPass] = useState();
    const [rePass, setRePass] = useState();
    const navigate = useNavigate();
    const sendMail = async(e)=>{
        e.preventDefault();
        if(email){
            try {
                await axios.post('https://chicdrobe.onrender.com/auth/sendmail',{email}).then((res)=>{
                    console.log(res);
                    localStorage.setItem("OTP",res.data.otp);
                    setOtp(res.data.otp);
                    setToggle(true);
                    setTimeout(()=>{
                        setOtp(null);
                        localStorage.removeItem("OTP");
                    },300000)
                }).catch((err)=>{
                    console.log(err);
                    toast.error(err.response.data.msg)
                })
            } catch (error) {
                toast.error(error.message);
            }
        }
    }
    const userVerification = async(e)=>{
        e.preventDefault();
        if(userOtp == otp){
            setVerified(true);
            toast("User verified");
            console.log(otp);
        }
        else{
            toast.error("Invalid OTP")
            console.log(otp);
        }
    }
    const resetPassword = async(e)=>{
        e.preventDefault();
        try {
            if(newPass == rePass){
            await axios.post('https://chicdrobe.onrender.com/auth/resetpassword',{email, password: newPass}).then((res)=>{
                console.log(res.data);
                toast.success("Password Reset Successfully");
                navigate('/login');
            }).catch((err)=>{
                toast.error("Password Reset Failed")})
        }
            else if(newPass != rePass){
                toast.error("Both Passwords doesn't match.")
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="home sm:h-[450px] h-[400px]">
        <div className="login w-full h-full flex flex-col justify-center items-center">
            {verified ? 
        <form onSubmit={resetPassword} className="form px-5 py-7 rounded-lg flex flex-col justify-center items-left">
            <h1 className="self-center mb-5 text-2xl font-bold">New Password</h1>
            <label htmlhtmlFor="pass" className="pl-2 font-medium">Enter New Password</label>
            <input type="password" className="m-2 px-3 py-1" placeholder="Enter New Password" id="pass" onChange={(e)=>{setNewPass(e.target.value)}} required name='pass'/>
            <label htmlhtmlFor="password" className="pl-2 font-medium">Re Enter New Password</label>
            <input type="password" className="m-2 px-3 py-1" placeholder="Re Enter New Password" id="password" onChange={(e)=>{setRePass(e.target.value)}} required name='password'/>
            <button className=" self-center m-3 px-3 py-1 text-xl font-semibold rounded-lg" type='submit'>Set Password</button>

        </form> : 
        toggle ? 
            <form onSubmit={userVerification} className="form px-5 py-7 rounded-lg flex flex-col justify-center items-left">
            <h1 className="self-center mb-5 text-2xl font-bold">Verify Email</h1>
            <label htmlhtmlFor="otp" className="pl-2 font-medium">Enter OTP</label>
            <input type="number" className="m-2 px-3 py-1" placeholder="Enter Your OTP" id="otp" onChange={(e)=>{setUserOtp(e.target.value)}} required name='otp'/>
            <button className=" self-center m-3 px-3 py-1 text-xl font-semibold rounded-lg" type='submit'>Verify</button>
            <p className='text-sm '>*OTP IS VALID FOR ONLY 5 MINUTES*</p>
        </form>
        :
            <form onSubmit={sendMail} className="form px-5 py-7 rounded-lg flex flex-col justify-center items-left">
                <h1 className="self-center mb-5 text-2xl font-bold">Reset Password</h1>
                <label htmlhtmlFor="email" className="pl-2 font-medium">Email:</label>
                <input type="email" className="m-2 px-3 py-1" placeholder="Enter Your Email" id="email" onChange={(e)=>{setEmail(e.target.value)}} required name='email'/>
                <button className=" self-center m-3 px-3 py-1 text-xl font-semibold rounded-lg" type='submit'>Send OTP</button>
            </form>
}
        </div>
    </div>
  )
}

export default ForgetPassword