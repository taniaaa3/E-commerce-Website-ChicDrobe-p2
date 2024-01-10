import { createContext, useContext, useState } from "react";
import axios from 'axios';
import { useAuth } from "./useAuth";

const OrderContext = createContext();

export const OrderProvider = ({children})=>{
    const [orders, setOrders] = useState([]);
    const {token} = useAuth();
    const createOrder = async(data)=>{
        try {
            await axios.post("http://localhost:3003/order/place",data,{
                headers: {"Authorization":`Bearer ${token}`}
            }).then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const orderHistory = async()=>{
        try {
            await axios.get("http://localhost:3003/order/allorders",{
                headers: {"Authorization":`Bearer ${token}`}
            }).then((res)=>{
                // console.log(res);
                setOrders(res.data.orders);
            }).catch((err)=>{
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return <OrderContext.Provider value={{createOrder, orderHistory, orders}}>
        {children}
    </OrderContext.Provider>
}

export const useOrder = ()=>{
    return useContext(OrderContext);
}