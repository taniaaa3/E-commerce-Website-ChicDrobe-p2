import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [disNum, setDisNum] = useState(0);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const navigate = useNavigate();
    const getWishlist = async () => {
        await axios.get('http://192.168.1.109:3003/wishlist/get', {
            headers: { "Authorization": `Bearer ${token}` }
        }).then((res) => {
            setWishlist(res.data.wishlist);
            setLoading(false);
        }).catch((err) => { console.log(err); })
    }
    const removeWishlist = async (id) => {
        await axios.delete('http://192.168.1.109:3003/wishlist/remove', id).then(() => {
            toast('Item removed')
        }).catch((err) => { console.log(err); })
    }
    let arr = wishlist.slice(disNum, disNum+2);
    
    useEffect(() => {
        getWishlist();
    })
    return (
        <>
            {loading ?
                <div className='w-full flex justify-center items-center self-center'>
                    <Loader />
                </div> :
                wishlist.length != 0 ?
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
                                                            <button onClick={() => { removeWishlist(val.products[0]._id) }} className=" rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">Remove</button>
                                                        </td>
                                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                            <button onClick={()=>{navigate(`/allproducts/${val.products[0]._id}`)}} className=" rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">View Product</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </>
                                        )
                                    })
                                }
                                </table>
                            </div>
                        </div>
                        <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                            <span className="text-xs text-gray-600 sm:text-sm"> Showing {arr.length} of {wishlist.length} Entries </span>
                            <div className="mt-2 inline-flex sm:mt-0">
                            {disNum <= 0 ? <button disabled className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Prev</button>
                            : <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100" onClick={()=>{
                                setDisNum(disNum - 2)
                            }}>Prev</button>}
                                {disNum >= wishlist.length - 2 ? <button disabled className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Next</button>                            : <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100" onClick={()=>{
                                setDisNum(disNum + 2);
                            }}>Next</button>}
                            </div>
                        </div>
                    </div> :
                    <div className='m-5 flex flex-col w-full justify-center items-center self-center'>
                        <i className='fa fa-bag-shopping text-7xl m-2'></i>
                        <h1 className='sm:text-5xl text-xl font-bold'>Your Wishlist is empty :(</h1>
                    </div>
            }</>
    )
}

export default Wishlist