import React, { useEffect, useState } from 'react'
import { useOrder } from '../context/useOrder'

const MyOrders = () => {
    const {orders, orderHistory} = useOrder();
    useEffect(()=>{
        orderHistory();
        console.log(orders);
    })
  return (
    <>
            {
                orders.length != 0 ?
                    <>
                        <div className="flex flex-col m-3 justify-center w-3/4 items-center">
                            <div className="mx-auto w-full px-4 py-8 sm:px-8">
                                <div className="overflow-y-hidden rounded-lg border">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-purple-500 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                                    <th className="px-5 py-3">Sr No.</th>
                                                    <th className="px-5 py-3">Product Name</th>
                                                    <th className="px-5 py-3">Unit Price</th>
                                                    <th className="px-5 py-3">In Stock</th>
                                                    <th className="px-5 py-3">Action</th>
                                                    <th className="px-5 py-3">Action</th>
                                                </tr>
                                            </thead>
                                            {orders.map((val, i) => {
                                                return (
                                                    <>
                                                        <tbody className="text-gray-500">
                                                            <tr>
                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    <p className="whitespace-no-wrap text-center">{i + 1}</p>
                                                                </td>
                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    
                                                                            <p className="whitespace-no-wrap">{val.address.firstName}</p>
                                                                        
                                                                </td>
                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    <p className="whitespace-no-wrap">{val.address.state}</p>
                                                                </td>


                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">{val.address.city}</span>
                                                                </td>
                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    <button className=" rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">Remove</button>
                                                                </td>
                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    <button className=" rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">View Product</button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </>
                                                )
                                            })}
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className='border border-[#CDB4DB] w-full'></div>


                        </div>
                    </>
                    :
                    <div className='m-5 flex flex-col w-full justify-center items-center'>
                        <i className='fa fa-bag-shopping text-7xl m-2'></i>
                        <h1 className='sm:text-5xl text-xl font-bold'>Your Cart is empty :(</h1>
                    </div>}
        </>
  )
}

export default MyOrders