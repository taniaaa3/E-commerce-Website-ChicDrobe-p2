import React, { useEffect } from 'react'
import { useAuth } from '../context/useAuth'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

const Logout = () => {
    const {logout, token} = useAuth();
    const navigate = useNavigate();
    const notify = (message)=>{
        toast(message, {
            icon: "🚀"
          });
    }
    useEffect(()=>{
        logout();
        notify('Logout successful')
        navigate('/login');
    },[token])
}

export default Logout