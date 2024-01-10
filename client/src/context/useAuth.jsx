import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userData, setUserData] = useState({});

    const storeToken = (tokenURI)=>{
        localStorage.setItem('token',tokenURI);
        setToken(tokenURI);
    }
    const logout = ()=>{
        localStorage.removeItem('token');
        setToken(null);
        setUserData({});
    }
    const fetchUser = async()=>{
        axios.get('http://localhost:3003/auth/user',{
            headers: {"Authorization":`Bearer ${token}`}
        }).then((res)=>{
            setUserData(res.data.userData);
        })
    }
    return <AuthContext.Provider value={{storeToken, token, logout, fetchUser, userData}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = ()=>{
    return useContext(AuthContext);
}

