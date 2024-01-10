import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import {Link} from 'react-router-dom';

const MyCart = () => {
    const [products, setProducts] = useState([]);
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const fetchCart = async () => {

        await axios.get('http://localhost:3003/cart/get', {
            headers: { "Authorization": `Bearer ${token}` }
        }).then((res) => {
            setProducts(res.data.cart)
            setLoading(false);
        }).catch((err) => { console.log(err); })
    }
    const deleteItem = async (id) => {
        await axios.delete('http://localhost:3003/cart/remove', id).then(() => {
            toast('Item deleted');
        }).catch(() => {
            toast('Item not deleted')
        })
    }
    useEffect(() => {
        fetchCart();
    })

    return (
        <>
            {loading ?
                <div className='w-full flex justify-center items-center '>
                    <Loader />
                </div>
                :
                products.length != 0 ?
                    <>
                        <div className="flex flex-col m-3 justify-center w-3/4 items-center">


                            {/* <div className=" flex flex-col sm:flex-row justify-between items-center">
                <img className="w-1/2 sm:w-1/4"
                    src={`/uploads/${val.products[0].image1}`}
                    alt="product image"/>
                <div className="flex flex-col justify-center items-center sm:items-start m-2">
                    <h1 className="text-3xl font-bold text-center">{val.products[0].title}</h1>
                    <p className="text-xl font-semibold">Price: {val.products[0].price}₹ <span className="line-through text-sm">{val.products[0].price * 2}₹</span> <i className="fa-solid fa-trash cursor-pointer" style={{color: "red"}} onClick={()=>deleteItem(val.products[0]._id)}></i> </p>
                    
                    <div className=" flex flex-row justify-center items-center sm:items-start">
                        
                        <button className="border-[#CDB4DB] p-2 px-4 font-semibold rounded-lg border m-2 hover:bg-[#CDB4DB]"
                           >-</button>
                        <input type="number" id="quantity"
                            className="border-[#CDB4DB] w-1/4 p-2 font-semibold rounded-lg border m-2" placeholder='0'/>
                        <button className="border-[#CDB4DB] p-2 px-4 font-semibold rounded-lg border m-2 hover:bg-[#CDB4DB]"
                            >+</button>
                    </div>
                </div>
            </div> */}
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
                                            {products.map((val, i) => {
                                                return (
                                                    <>
                                                        <tbody className="text-gray-500">
                                                            <tr>
                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    <p className="whitespace-no-wrap text-center">{i + 1}</p>
                                                                </td>
                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    <div className="flex items-center">
                                                                        <div className="h-50 w-40 flex-shrink-0">
                                                                            <img className="h-full w-full rounded-lg" src={`/uploads/${val.products[0].image1}`} alt="" />
                                                                        </div>
                                                                        <div className="ml-3">
                                                                            <p className="whitespace-no-wrap">{val.products[0].title}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    <p className="whitespace-no-wrap">{val.products[0].price}</p>
                                                                </td>


                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">{val.products[0].stock > 0 ? "Yes" : "No"}</span>
                                                                </td>
                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    <button onClick={() => { deleteItem(val.products[0]._id) }} className=" rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">Remove</button>
                                                                </td>
                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    <Link to={`/allproducts/${val.products[0]._id}`} className=" rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">View Product</Link>
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

export default MyCart