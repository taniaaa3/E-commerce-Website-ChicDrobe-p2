import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/useAuth';
import { useOrder } from '../context/useOrder';

const Shipping = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { setPlaceOrder, placeOrder } = useOrder();
  const [address, setAddress] = useState({
    fullName: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: ''
  })
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [toggle, setToggle] = useState(true);
  // To get addresses
  const getAddresses = async () => {
    await axios.get('https://chicdrobe.onrender.com/edit/getaddresses', {
      headers: { "Authorization": `Bearer ${token}` }
    }).then((res) => {
      setSavedAddresses(res.data.addresses);
    }).catch((err) => console.log(err))
  }

  const saveAddress = async (e) => {
    e.preventDefault();
    await axios.post('https://chicdrobe.onrender.com/edit/saveaddress', address, {
      headers: { "Authorization": `Bearer ${token}` }
    }).then((res) => {
      console.log(res.data);
      setPlaceOrder({ ...placeOrder, ["address"]: res.data.save });
      navigate('payment');
    }).catch((err) => { console.log(err); toast.error('Address not saved') })
  }
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setAddress({ ...address, [name]: value })
  }

  useEffect(() => {
    getAddresses();
  })
  return (
    <>
    <div className="flex justify-center mt-5 items-center text-lg sm:text-xl">
        <p className="ml-3 text-center font-medium leading-5 sm:text-left">
          <span className="uppercase"><span className="rounded-md bg-rose-400 px-2 text-white">Warning</span> do not refresh page</span>
        </p>
      </div>
      <div className="mt-4  py-2 text-xs flex flex-row justify-center items-center sm:text-base">
        <div className="relative">
          <ul className="relative flex items-center justify-between space-x-2 sm:space-x-4">
            <li className="flex items-center space-x-2 text-left sm:space-x-4">
              <a className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-400 text-xs font-semibold text-purple-700"
              ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></a>
              <span className="font-semibold text-purple-900">Shop</span>
            </li>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <li className="flex items-center space-x-2 text-left sm:space-x-4">
              <a className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-900 text-xs font-semibold text-white ring ring-purple-900 ring-offset-2">2</a>
              <span className="font-semibold text-purple-900">Shipping</span>
            </li>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <li className="flex items-center space-x-2 text-left sm:space-x-4">
              <a className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-900 text-xs font-semibold text-white">3</a>
              <span className="font-semibold text-purple-900">Payment</span>
            </li>
          </ul>
        </div>
        
      </div>
      
      <div className="contact flex flex-col sm:flex-row justify-evenly items-center">
        {toggle && savedAddresses.length > 0 ?
          <div className="flex w-5/6 sm:w-full py-10 items-center justify-center">

            <form className="grid w-96 grid-cols-1 gap-2" onSubmit={(e) => { e.preventDefault(); navigate('payment') }}>
              <div className='flex flex-row justify-between items-center'>
                <h1 className="text-xl font-bold uppercase">Choose Address</h1>
                <button type='button' className="text-xs font-semibold uppercase p-2 rounded-lg text-purple-700 border border-purple-700" onClick={() => { setToggle(false) }}><i className="fa fa-plus" /> Add New Address</button>
              </div>
              {savedAddresses.map((val, i) => {
                return (
                  <>
                    <div className="relative">
                      <input className="peer hidden" required id={`radio${i}`} type="radio"  name={`radio`} onChange={() => {
                        setPlaceOrder({ ...placeOrder, ["address"]: val });
                        console.log(placeOrder);
                      }} />
                      <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-indigo-500"></span>
                      <label className="flex cursor-pointer flex-col rounded-lg border border-gray-300 p-4 peer-checked:border-4 peer-checked:border-indigo-700" htmlFor={`radio${i}`}>
                        <span className="text-xs font-semibold uppercase">{val.city}, {val.state}</span>
                        <span className="mt-2 text-xl font-bold">{val.fullName}</span>
                        <ul className="mt-2 text-sm">
                          <li>{val.phoneNumber}</li>
                          <li>{val.address1}, {val.address2}, {val.city}, {val.state}, {val.pincode}</li>
                        </ul>
                      </label>
                    </div>
                  </>)
              })}
              <button type='submit' className="text-xs font-semibold uppercase p-2 rounded-lg text-purple-700 border border-purple-700">Proceed Further</button>
            </form>
          </div>
          : toggle && savedAddresses.length == 0 ?
            <div className="sm:w-1/2 md:w-1/3 w-full">
              <div className='flex flex-row justify-between items-center m-5'>
                <h1 className="text-xl font-bold uppercase">Choose Address</h1>
              </div>
              <form className="form flex flex-col px-2 py-2 m-5 rounded-lg" onSubmit={saveAddress}>
                <input type="text" id="name" name='fullName' onChange={(e) => { handleChange(e) }} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Full Name" required />
                <input type="text" id="phoneNumber" name='phoneNumber' onChange={(e) => { handleChange(e) }} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Phone Number" required />
                <input type="text" name='pincode' onChange={(e) => { handleChange(e) }} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Pincode" required />
                <div className='flex flex-row justify-evenly'>
                  <input type="text" name='state' onChange={(e) => { handleChange(e) }} className="w-1/2 m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="State" required />
                  <input type="text" name='city' onChange={(e) => { handleChange(e) }} className="w-1/2 m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="City" required />
                </div>
                <input type="text" name='address1' onChange={(e) => { handleChange(e) }} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="House No., Building Name" required />
                <input type="text" name='address2' onChange={(e) => { handleChange(e) }} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Road name, Area, Colony" required />

                <button type='submit' className="self-center m-3 px-3 py-1 text-xl font-semibold rounded-lg">Save Address</button>
              </form>
            </div> : 
            <div className="sm:w-1/2 md:w-1/3 w-full">
            <div className='flex flex-row justify-between items-center m-5'>
              <h1 className="text-xl font-bold uppercase">Choose Address</h1>
              <button className="text-xs font-semibold uppercase p-2 rounded-lg text-purple-700 border border-purple-700" onClick={() => { setToggle(true) }}>Saved Addresses</button>
            </div>
            <form className="form flex flex-col px-2 py-2 m-5 rounded-lg" onSubmit={saveAddress}>
              <input type="text" id="name" name='fullName' onChange={(e) => { handleChange(e) }} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Full Name" required />
              <input type="text" id="phoneNumber" name='phoneNumber' onChange={(e) => { handleChange(e) }} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Phone Number" required />
              <input type="text" name='pincode' onChange={(e) => { handleChange(e) }} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Pincode" required />
              <div className='flex flex-row justify-evenly'>
                <input type="text" name='state' onChange={(e) => { handleChange(e) }} className="w-1/2 m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="State" required />
                <input type="text" name='city' onChange={(e) => { handleChange(e) }} className="w-1/2 m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="City" required />
              </div>
              <input type="text" name='address1' onChange={(e) => { handleChange(e) }} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="House No., Building Name" required />
              <input type="text" name='address2' onChange={(e) => { handleChange(e) }} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Road name, Area, Colony" required />

              <button type='submit' className="self-center m-3 px-3 py-1 text-xl font-semibold rounded-lg">Save Address</button>
            </form>
          </div>}
      </div>
    </>
  )
}

export default Shipping