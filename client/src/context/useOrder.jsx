import { createContext, useContext, useState } from "react";
import axios from 'axios';
import { useAuth } from "./useAuth";

const OrderContext = createContext();

export const OrderProvider = ({children})=>{
    const [orders, setOrders] = useState([]);
    const [placeOrder, setPlaceOrder] = useState({
        address: {},
        products: [],
        paymentMethod: "PayPal"
    });
    const {token} = useAuth();
    const orderHistory = async()=>{
        try {
            await axios.get("https://chicdrobe.onrender.com/order/myorders",{
                headers: {"Authorization":`Bearer ${token}`}
            }).then((res)=>{
                setOrders(res.data.orders);
            }).catch((err)=>{
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const adminPanelOrders = async()=>{
        try {
            await axios.get("https://chicdrobe.onrender.com/order/allorders",{
                headers: {"Authorization":`Bearer ${token}`}
            }).then((res)=>{
                setOrders(res.data.orders);
            }).catch((err)=>{
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const allOrders = async()=>{
        try {
            await axios.get("https://chicdrobe.onrender.com/order/myorders",{
                headers: {"Authorization":`Bearer ${token}`}
            }).then((res)=>{
                setOrders(res.data.orders);
            }).catch((err)=>{
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return <OrderContext.Provider value={{orderHistory, orders, setPlaceOrder, placeOrder, allOrders, adminPanelOrders}}>
        {children}
    </OrderContext.Provider>
}

export const useOrder = ()=>{
    return useContext(OrderContext);
}