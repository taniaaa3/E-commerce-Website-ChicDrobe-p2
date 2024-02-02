import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useOrder } from '../context/useOrder';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const {token} = useAuth();
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState(0);
    const {setPlaceOrder, placeOrder} = useOrder();
    const navigate = useNavigate();

    const amount = async()=>{
        if(products.length > 0){
        try {
            let total =  products.map((val)=>{
                return Number(val.products[0].cartItem.price) * Number(val.quantity)
            })
            let cost = total.reduce((a,b)=>{
                return a + b;
            })
            setPrice(cost);
        } catch (error) {
            console.log(error);
        }}
    }

    const fetchCart = async()=>{
        await axios.get('https://chicdrobe.onrender.com/cart/get',{
            headers: {"Authorization":`Bearer ${token}`}
        }).then((res)=>{
            setProducts(res.data.cart)
            console.log(res.data.cart);
            setLoading(false);
        }).catch((err)=>{console.log(err);setLoading(false);})
    }
    const deleteItem = async(id)=>{
        await axios.delete('https://chicdrobe.onrender.com/cart/remove',id).then(()=>{
            toast('Item deleted');
            setLoading(false);
        }).catch(()=>{
            toast('Item not deleted')
        })
    }
    const updateQuantity = async(quantity, id)=>{
        console.log({quantity, id});
        if(quantity >= 1){
        try {
            await axios.patch(`https://chicdrobe.onrender.com/cart/update`,{quantity, id},{
                headers: {"Authorization":`Bearer ${token}`}
            }).then((res)=>{
                console.log(res);
            }).catch((err)=>{console.log(err);})
        } catch (error) {
            console.log(error);
        }}
        else{
            toast.error('Quantity cannot be less than 1')
        }
    }
    const checkout = async()=>{
        setPlaceOrder({...placeOrder, ["products"]:products}); 
        navigate('/shipping')
        console.log(placeOrder);
    }
    useEffect(()=>{
        fetchCart();
        amount();
    })

     return (
    <div>
        {loading && products.length == 0 ? 
        <div className='w-full flex justify-center items-center '>
        <Loader />
    </div> : 
        !loading && products.length != 0 ?
        <>
        <div className="mt-4 py-2 text-xs flex flex-row justify-center items-center sm:text-base w-full">
    <div className="relative">
      <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full  bg-purple-900 text-xs font-semibold text-white ring ring-purple-900 ring-offset-2"
            >1</a>
          <span className="font-semibold text-purple-900">Shop</span>
        </li>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-900 text-xs font-semibold text-white">2</a>
          <span className="font-semibold text-purple-900">Shipping</span>
        </li>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-900 text-xs font-semibold text-white">3</a>
          <span className="font-semibold text-purple-900">Payment</span>
        </li>
      </ul>
    </div>
  </div>
  <div className="body flex flex-col sm:flex-row justify-center items-center m-2 sm:items-start">
        <div className="flex flex-col border-[#CDB4DB] border m-3 justify-center items-center sm:w-1/2 w-full">
            <h1 className="text-3xl font-bold bg-[#CDB4DB] w-full text-center">Items in cart</h1>
            {products.map((val)=>{
            return (
                <>
            <div className=" flex flex-col sm:flex-row justify-between items-center">
                <img className="w-1/2 sm:w-1/3"
                    src={`/uploads/${val.products[0].cartItem.image1}`}
                    alt="product image"/>
                <div className="flex flex-col justify-center items-center sm:items-start m-2">
                    <h1 className="text-3xl font-bold text-center">{val.products[0].cartItem.title}</h1>
                    <p className="text-xl font-semibold">Price: {val.products[0].cartItem.price}₹ <span className="line-through text-sm">{val.products[0].cartItem.price * 2}₹</span> <i className="fa-solid fa-trash cursor-pointer" style={{color: "red"}} onClick={()=>deleteItem(val.products[0].cartItem._id)}></i> </p>
                    <p className="text-sm text-gray-600 font-semibold">Size: {val.products[0].size} </p>
                    <p className="text-sm font-semibold text-gray-600">Color: {val.products[0].color} </p>
                    
                    <div className=" flex flex-row justify-center items-center sm:items-start">
                        
                        <button className="border-[#CDB4DB] p-2 px-4 font-semibold rounded-lg border m-2 hover:bg-[#CDB4DB]"
                          onClick={()=>{updateQuantity(Number(val.quantity)-1, val.products[0].cartItem._id)}} >-</button>
                        <input type="number" id="quantity"
                            className="border-[#CDB4DB] w-1/4 p-2 font-semibold rounded-lg border m-2" placeholder='1' value={val.quantity}/>
                        <button className="border-[#CDB4DB] p-2 px-4 font-semibold rounded-lg border m-2 hover:bg-[#CDB4DB]"
                           onClick={()=>{updateQuantity(Number(val.quantity)+1, val.products[0].cartItem._id)}} >+</button>
                    </div>
                </div>
            </div>
                <div className='border border-[#CDB4DB] w-full'></div>
                </>
            )
            })}
        </div>
        <div className="flex flex-col border-[#CDB4DB] border m-3 justify-between items-center sm:w-1/4 h-64 w-full">
            <h1 className="text-3xl font-bold bg-[#CDB4DB] w-full text-center self-start">Summary</h1>
            <div className="flex flex-row w-full my-2 px-3 justify-between items-center">
                <p>Cost</p>
                <p id="cost">{price}₹</p>
            </div>
            <div className="flex flex-row w-full my-2 px-3 justify-between items-center"
                style={{borderBottom: "1px #CDB4DB solid", paddingBottom: "20px"}}>
                <p>Shipping</p>
                <p>99₹</p>
            </div>
            <div className="flex flex-row w-full my-3 px-3 justify-between items-center">
                <p className="font-semibold">Total</p>
                <p className="font-semibold" id="total">{price + 99}₹</p>
            </div>
            <button
                className="border-[#CDB4DB] p-2 font-semibold rounded-lg border m-2 hover:bg-[#CDB4DB]" onClick={checkout}>Checkout</button>
                
        </div>
        </div>
        
    </>
    : 
    products.length == 0 && !loading ?
    <div className='m-5 flex flex-col justify-center items-center'>
        <i className='fa fa-bag-shopping text-7xl m-2'></i>
        <h1 className='sm:text-5xl text-xl font-bold'>Your Cart is empty :(</h1>
    </div> : ""}
    </div> 
  )
}

export default Cart