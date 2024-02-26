import React, { useState } from 'react'
import { useAuth } from '../context/useAuth'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [loginLoading, setLoginLoading] = useState(false);
    const {storeToken} = useAuth();
    const navigate = useNavigate();
    const handleChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setUserData({...userData, [name]:value})
    }
    const notify = (message)=>{
        toast(message, {
            icon: "🚀"
          });
    }
    const warn = (message)=>{
        toast.error(message)
    }
    const login = async(e)=>{
        e.preventDefault();
        try {
            setLoginLoading(true);
            await axios.post('https://chicdrobe.onrender.com/auth/login',userData).then((res)=>{
                if(res.status == 200){
                    storeToken(res.data.token);
                    navigate('/');
                    setLoginLoading(false);
                    notify('Login successful')
                }
            }).catch((error)=>{warn('Invalid Credentials'); console.log(error);})
        } catch (error) {
            console.log(error);
        }
        
    }
  return (
    <div className="home sm:h-[450px] h-[400px]">
        <div className="login w-full h-full flex flex-col justify-center items-center">
            <form onSubmit={login} className="form px-5 py-7 rounded-lg flex flex-col justify-center items-left">
                <h1 className="self-center m-2 text-2xl font-bold">LOGIN</h1>
                <label htmlhtmlFor="email" className="pl-2 font-medium">Email:</label>
                <input type="email" className="m-2 px-3 py-1" placeholder="Enter Your Email" id="email" onChange={(e)=>{handleChange(e)}} required name='email'/>
                <label htmlhtmlFor="pass" className="pl-2 font-medium">Password:</label>
                <input id="pass" className="m-2 px-3 py-1" placeholder="Enter Your Password" type="password" onChange={(e)=>{handleChange(e)}} required name='password'/>
                <Link to="/forgetpassword" className='text-xs self-end border-2 border-purple-400 p-1 rounded-sm font-bold'>Forgot password?</Link>
                <button className={`self-center m-3 px-3 py-1 text-xl font-semibold rounded-lg`} {loginLoading ? "disabled" : ""} type='submit'>{loginLoading ? "Logging in" : "Login"}</button>
            </form>
        </div>
    </div>
  )
}

export default Login
