import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import {Link, useNavigate} from 'react-router-dom';

const MyCart = () => {
    const [products, setProducts] = useState([]);
    const [disNum, setDisNum] = useState(0);
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const fetchCart = async () => {

        await axios.get('https://chicdrobe.onrender.com/cart/get', {
            headers: { "Authorization": `Bearer ${token}` }
        }).then((res) => {
            setProducts(res.data.cart)
            console.log(res.data.cart);
            setLoading(false);
        }).catch((err) => { console.log(err); })
    }
    const deleteItem = async (id) => {
        await axios.delete('https://chicdrobe.onrender.com/cart/remove', id).then(() => {
            toast('Item deleted');
        }).catch(() => {
            toast('Item not deleted')
        })
    }
    useEffect(() => {
        fetchCart();
    })
    let arr = products.slice(disNum,disNum+2);

    return (
        <>
            {loading ?
                <div className='w-full flex justify-center items-center self-center'>
                    <Loader />
                </div>
                :
                products.length != 0 ?
                    <>
                            <div className="mx-auto w-full px-4 py-8 sm:px-8 self-center">
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
                                            {arr.map((val, i) => {
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
                                                                            <img className="h-full w-full rounded-lg" src={`/uploads/${val.products[0].cartItem.image1}`} alt="" />
                                                                        </div>
                                                                        <div className="ml-3">
                                                                            <p className="whitespace-no-wrap">{val.products[0].cartItem.title}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    <p className="whitespace-no-wrap">{val.products[0].cartItem.price}</p>
                                                                </td>
                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">{val.products[0].cartItem.stock > 0 ? "Yes" : "No"}</span>
                                                                </td>
                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    <button onClick={() => { deleteItem(val.products[0].cartItem._id) }} className=" rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">Remove</button>
                                                                </td>
                                                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                    <button onClick={()=>{navigate(`/allproducts/${val.products[0].cartItem._id}`)}} className=" rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">View Product</button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </>
                                                )
                                            })}
                                        </table>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                            <span className="text-xs text-gray-600 sm:text-sm"> Showing {arr.length} of {products.length} Entries </span>
                            <div className="mt-2 inline-flex sm:mt-0">
                                {disNum <= 0 ? <button disabled className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Prev</button>
                            : <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100" onClick={()=>{
                                setDisNum(disNum - 2)
                            }}>Prev</button>}
                                {disNum >= products.length - 2 ? <button disabled className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Next</button>                            : <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100" onClick={()=>{
                                setDisNum(disNum + 2);
                            }}>Next</button>}
                                
                                
                            </div>
                        </div>
                            </div>
                    </>
                    :
                    <div className='m-5 flex flex-col w-full justify-center items-center self-center'>
                        <i className='fa fa-bag-shopping text-7xl m-2'></i>
                        <h1 className='sm:text-5xl text-xl font-bold'>Your Cart is empty :(</h1>
                    </div>}
        </>
    )
}

export default MyCart