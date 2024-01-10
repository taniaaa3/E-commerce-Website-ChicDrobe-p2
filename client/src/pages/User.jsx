import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar';
import Edit from './Edit';
import Wishlist from './Wishlist';
import MyCart from './MyCart';
import SavedAddresses from './SavedAddresses';
import MyOrders from './MyOrders';

const User = () => {
    
  return (
    <div className='flex md:flex-row flex-col m-2 border-[#CDB4DB] border-2 justify-between'>
      <Sidebar/>
      {window.location.pathname == '/user/edit'? <Edit/>
      : window.location.pathname == '/user/wishlist' ? <Wishlist/>
      : window.location.pathname == '/user/cart' ? <MyCart/>
      : window.location.pathname == '/user/reviews' ? <h1>hello review</h1>
      : window.location.pathname == '/user/orders' ? <MyOrders/>
      : window.location.pathname == '/user/addresses' ? <SavedAddresses/>
      : <h1>hello</h1>}
    </div>
  )
}

export default User