import React, { useEffect, useState } from 'react'
import { useOrder } from '../context/useOrder'
import { toast } from 'react-toastify';
import axios from 'axios';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const { placeOrder, setPlaceOrder } = useOrder();
  const [price, setPrice] = useState(0);
  const [USD, setUSD] = useState();
  const {token} = useAuth();
  const navigate = useNavigate();
  const amount = async () => {
    if (placeOrder.products.length > 0 && window.location.pathname == "/shipping/payment") {
      try {
        let total = placeOrder.products.map((val) => {
          return Number(val.products[0].cartItem.price) * Number(val.products[0].quantity)
        })
        let cost = total.reduce((a, b) => {
          return a + b;
        },0)
        setPrice(cost)
      } catch (error) {
        console.log(error);
      }
    }
    else if (placeOrder.products.length > 0 && window.location.pathname != "/shipping/payment") {
      try {
        let total = placeOrder.products.map((val) => {
          return Number(val.product.price) * Number(val.quantity)
        })
        let cost = total.reduce((a, b) => {
          return a + b;
        })
        setPrice(cost)
      } catch (error) {
        console.log(error);
      }
    }
    else {
      // toast.error('UNEXPECTED ERROR')
    }
  }

  useEffect(() => {
    amount();
  })
  useEffect(()=>{
    axios.get('https://api.currencyapi.com/v3/latest?apikey=cur_live_9j9tWGC2kgnhgBeabUKrYCIurq0KoJ90LBXhBfpM&currencies=USD&base_currency=INR').then((res)=>{
      setUSD(Math.ceil(price * res.data.data.USD.value))})
      console.log(USD);
  },[])


  return (
    <>
    <div className="flex w-full justify-center my-5 items-center text-xl">
        <p className="ml-3 text-center font-medium leading-5 sm:text-left">
          <span className="uppercase"><span className="rounded-md bg-rose-400 px-2 text-white">Warning</span> do not refresh page</span>
        </p>
      </div>
      <div className="mt-4 py-2 text-xs flex flex-row justify-center items-center sm:text-base w-full">
        <div className="relative">
          <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <a className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-400 text-xs font-semibold text-purple-700"
              ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></a>
              <span className="font-semibold text-purple-900">Shop</span>
            </li>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <a className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-400 text-xs font-semibold text-purple-700"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></a>
              <span className="font-semibold text-purple-900">Shipping</span>
            </li>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <a className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-900 text-xs font-semibold text-white ring ring-purple-900 ring-offset-2">3</a>
              <span className="font-semibold text-purple-900">Payment</span>
            </li>
          </ul>
        </div>
        
      </div>
      <div className="relative mx-auto w-full">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">Shipping Address<span className="mt-2 block h-1 w-10 bg-purple-600 sm:w-20"></span></h1>
              <div className='m-2'>
                <h1>{placeOrder.address.fullName}</h1>
                <h2>{placeOrder.address.PhoneNumber}</h2>
                <h2>{placeOrder.address.address1}, {placeOrder.address.address2}, {placeOrder.address.city}, {placeOrder.address.state}</h2>
                <h2>{placeOrder.address.pincode}</h2>
                </div>
              </div>
            <div className="mx-auto w-full max-w-lg m-5">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl my-2">Secure Checkout<span className="mt-2 block h-1 w-10 bg-purple-600 sm:w-20"></span></h1>
              <PayPalButtons forceReRender={[USD]} createOrder={async(data,actions)=>{
                  return actions.order.create({
                    purchase_units: [{amount: {value: USD}}]
                  })
              }}
              onApprove={(data,actions)=>{
                const {address,products,paymentMethod} = placeOrder
                const orderID = data.orderID
                axios.post('http://192.168.1.109:3003/order/place',{address, products,paymentMethod, orderID},{
                  headers: {"Authorization": `Bearer ${token}`}
                }).then((res)=>{
                  console.log(res);
                  toast('Order Placed Successfully');
                  navigate('/');
                }).catch((err)=>{
                  console.log(err);
                  toast.error("Order Not Placed")
                })
              }}
              />
              <h1 className="font-bold text-xl text-center m-5">
                  OR
              </h1>
              <button className='text-indigo-100 p-5 w-full bg-black' onClick={async()=>{
                  setPlaceOrder({...placeOrder, ["paymentMethod"]:"COD"});
                  let orderID = "Same as '_id'"
                  try {
                    const {address,products,paymentMethod} = placeOrder
                    axios.post('http://192.168.1.109:3003/order/place',{address, products,paymentMethod, orderID},{
                  headers: {"Authorization": `Bearer ${token}`}
                }).then((res)=>{
                  console.log(res);
                  toast('Order Placed Successfully');
                  navigate('/');
                }).catch((err)=>{
                  console.log(err);
                  toast.error("Order Not Placed")
                })
                  } catch (error) {
                    console.log(error);
                  }
              }}>CASH ON DELIVERY</button>
            </div>
          </div>
          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 className="sr-only">Order summary</h2>
            <div>
              <img src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-purple-800 to-purple-400 opacity-95"></div>
            </div>
            <div className="relative">
              <ul className="space-y-5">
                {window.location.pathname == "/shipping/payment" ? placeOrder.products.map((val) => {
                  return (
                    <li className="flex justify-between">
                      <div className="inline-flex">
                        <img src={`/uploads/${val.products[0].cartItem.image1}`} alt="" className="w-1/3" />
                        <div className="ml-3">
                          <p className="text-base font-semibold text-white">{val.products[0].cartItem.title}</p>
                          <p className="text-sm font-medium text-white text-opacity-80">Quantity: {val.quantity}</p>
                          <p className="text-sm font-medium text-white text-opacity-80">Shipping: 99₹ </p>
                          <p className="text-sm font-medium text-white text-opacity-80">Color: {val.products[0].color} </p>
                          <p className="text-sm font-medium text-white text-opacity-80">Size: {val.products[0].size} </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-white">{val.products[0].cartItem.price}₹</p>
                      
                    </li>
                  )
                }) : placeOrder.products.map((val) => {
                  return (
                    <li className="flex justify-between">
                      <div className="inline-flex">
                        <img src={`/uploads/${val.product.image1}`} alt="" className="w-1/3" />
                        <div className="ml-3">
                          <p className="text-base font-semibold text-white">{val.product.title}</p>
                          <p className="text-sm font-medium text-white text-opacity-80">Quantity: {val.quantity}</p>
                          <p className="text-sm font-medium text-white text-opacity-80">Shipping: 99₹ </p>
                          
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-white">{val.product.price}₹</p>
                    </li>
                  )
                })}
              </ul>
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div className="space-y-2">
                <p className="flex justify-between text-lg font-bold text-white"><span>Total price <span className='font-semibold text-sm text-gray-300'> (inclusive of gst & shipping)</span> :</span><span>{price + 99}₹</span></p>
              </div>
            </div>
            <div className="relative mt-10 text-white">
              <h3 className="mb-5 text-lg font-bold">Support</h3>
              <p className="text-sm font-semibold">+91 9427839899 <span className="font-light">(Contact Number)</span></p>
              <p className="mt-1 text-sm font-semibold">contact@chicdrobe.com <span className="font-light">(Email)</span></p>
              <p className="mt-2 text-xs font-medium">Call us now for payment related issues</p>
            </div>
            <div className="relative mt-10 flex">
              <p className="flex flex-col"><span className="text-sm font-bold text-white">Money Back Guarantee</span><span className="text-xs font-medium text-white">within 30 days of purchase</span></p>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Payment