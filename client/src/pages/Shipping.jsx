import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/useAuth';

const Shipping = () => {
    const navigate = useNavigate();
    const {token} = useAuth();
    const [address, setAddress] = useState({fullName: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: ''})
    const saveAddress = async(e)=>{
        e.preventDefault();
        await axios.post('http://localhost:3003/edit/saveaddress',address,{
          headers: {"Authorization":`Bearer ${token}`}
        }).then((res)=>{
            console.log(res.data);
            navigate('payment');
        }).catch((err)=>{console.log(err); toast.error('Address not saved')})
    }
    const handleChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setAddress({...address, [name]:value})
    }
  return (
   <>
   <div className="mt-4 py-2 text-xs flex flex-row justify-center items-center sm:text-base w-full">
    <div className="relative">
      <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-400 text-xs font-semibold text-purple-700"
            ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg></a>
          <span className="font-semibold text-purple-900">Shop</span>
        </li>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-900 text-xs font-semibold text-white ring ring-purple-900 ring-offset-2">2</a>
          <span className="font-semibold text-purple-900">Shipping</span>
        </li>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-900 text-xs font-semibold text-white">3</a>
          <span className="font-semibold text-purple-900">Payment</span>
        </li>
      </ul>
    </div>
  </div>
    <div className="contact flex flex-col sm:flex-row justify-evenly items-center">
        <div className="sm:w-1/2 md:w-1/3 w-full">
            <form className="form flex flex-col px-2 py-2 m-5 rounded-lg" onSubmit={saveAddress}>
                <input type="text" id="name" name='fullName' onChange={(e)=>{handleChange(e)}} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Full Name" required/>
                <input type="text" id="phoneNumber" name='phoneNumber' onChange={(e)=>{handleChange(e)}} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Phone Number" required/>
                <input type="text" name='pincode' onChange={(e)=>{handleChange(e)}} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Pincode" required/>
                <div className='flex flex-row justify-evenly'>
                <input type="text" name='state' onChange={(e)=>{handleChange(e)}} className="w-1/2 m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="State" required/>
                <input type="text" name='city' onChange={(e)=>{handleChange(e)}} className="w-1/2 m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="City" required/>
                </div>
                <input type="text" name='address1' onChange={(e)=>{handleChange(e)}} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="House No., Building Name" required/>
                <input type="text" name='address2' onChange={(e)=>{handleChange(e)}} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Road name, Area, Colony" required/>

                <button type='submit' className="self-center m-3 px-3 py-1 text-xl font-semibold rounded-lg">Save Address</button>
            </form>
        </div>
    </div>
   </>
  )
}

export default Shipping