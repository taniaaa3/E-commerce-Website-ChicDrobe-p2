import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar';
import Edit from './Edit';
import Wishlist from './Wishlist';
import MyCart from './MyCart';
import SavedAddresses from './SavedAddresses';
import MyOrders from './MyOrders';
import { useAuth } from '../context/useAuth';
import { useOrder } from '../context/useOrder';
import axios from 'axios';
import Loader from '../components/Loader';

const User = () => {
    const{userData, token} = useAuth();
    const {orderHistory, orders} = useOrder();
    const [wishlist, setWishlist] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const getWishlist = async () => {
      await axios.get('http://192.168.1.109:3003/wishlist/get', {
          headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {
          setWishlist(res.data.wishlist);
      }).catch((err) => { console.log(err); })
  }
  const fetchCart = async()=>{
    await axios.get('http://192.168.1.109:3003/cart/get',{
        headers: {"Authorization":`Bearer ${token}`}
    }).then((res)=>{
        setProducts(res.data.cart)
    }).catch((err)=>{console.log(err);})
}
const fetch = async()=>{
  await getWishlist();
  await fetchCart();
  await orderHistory();
 setLoading(false);
}
useEffect(()=>{
  if(window.location.pathname == "/user"){
  fetch();}
},[])
  return (
    <div className='flex md:flex-row p-2 flex-col m-2 border-[#CDB4DB] border-2 justify-between overflow-hidden'>
      <Sidebar/>
      {window.location.pathname == '/user/edit'? <Edit/>
      : window.location.pathname == '/user/wishlist' ? <Wishlist/>
      : window.location.pathname == '/user/cart' ? <MyCart/>
      : window.location.pathname == '/user/orders' ? <MyOrders userData={userData}/>
      : window.location.pathname == '/user/addresses' ? <SavedAddresses/>
      : loading ? <div className='w-full flex justify-center items-center self-center'>
      <Loader />
    </div> : <div className="self-center w-full my-10 flex justify-center flex-col items-center rounded-xl px-4 py-4 text-center md:flex-row md:items-center md:text-left">
      <div className=''>
        <i className='fa fa-user text-9xl m-2'></i>
      </div>
      <div className="">
        <p className="text-xl font-medium text-gray-700">{userData.firstName} {userData.lastName}</p>
        <p className="mb-4 text-sm font-medium text-gray-500">{userData.email}</p> 
        <div className="flex space-x-2">
          <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
            <p className="text-sm font-medium text-gray-500">Cart</p>
            <p className="text-3xl font-medium text-gray-600">{products.length}</p>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
            <p className="text-sm font-medium text-gray-500">Wishlist</p>
            <p className="text-3xl font-medium text-gray-600">{wishlist.length}</p>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
            <p className="text-sm font-medium text-gray-500">Orders</p>
            <p className="text-3xl font-medium text-gray-600">{orders.length}</p>
          </div>
          <div className=""></div>
        </div>
        <div className="mb-3"></div>
      </div>
    </div>
    }
    </div>
  )
}

export default User