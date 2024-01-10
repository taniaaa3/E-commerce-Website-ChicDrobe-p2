import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='glassmorphism md:w-1/4 w-full'>
        <ul className='p-2 text-lg flex md:flex-col flex-row wrap'>
          <NavLink to='/user/edit' className='p-3 m-2 sidebar'><i className='fa fa-user-pen text-gray-700'/> Edit Profile</NavLink>
          <NavLink to='/user/wishlist' className='p-3 m-2 sidebar'><i className='fa fa-heart text-rose-500'/> My wishlist</NavLink>
          <NavLink to='/user/cart' className='p-3 m-2 sidebar'><i className='fa fa-cart-shopping text-yellow-600'/> My Cart</NavLink>
          <NavLink to='/user/orders' className='p-3 m-2 sidebar'><i className='fa fa-box-open text-orange-600'/> Order History</NavLink>
          <NavLink to='/user/addresses' className='p-3 m-2 sidebar'><i className='fa fa-location-pin text-blue-700'/> Saved addresses</NavLink>
          <NavLink to='/user/reviews' className='p-3 m-2 sidebar'><i className='fa fa-edit text-green-700'/> My Reviews</NavLink>
        </ul>
      </div>
  )
}

export default Sidebar