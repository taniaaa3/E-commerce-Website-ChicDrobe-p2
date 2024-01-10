import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Ratings from '../components/Ratings';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { useAuth } from '../context/useAuth';
import Loader from '../components/Loader'

const ProductRedirect = () => {
    const [wishlist, setWishlist] = useState(false);
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [curProduct, setCurProduct] = useState({
        title: '',
        price: '',
        description: '',
        image1: '',
        image2: '',
        category: '',
        type: '',
        stock: '',
        sizes: [],
        colors: []
    });
    const [productExist, setProductExist] = useState(false);
    const [display, setDisplay] = useState();
    const params = useParams();
    const productFetch = async () => {
        await axios.get(`http://localhost:3003/products/redirect/${params.id}`).then((res) => {
            setCurProduct(res.data.product);
            setLoading(false);
        }).catch((err) => { console.log(err); })
    }
    const checkWishlist = async () => {
        if (token) {
            await axios.get(`http://localhost:3003/wishlist/check/${params.id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then((res) => {
                if (res.data.msg == "Product already exists in wishlist") {
                    setWishlist(true);
                }
                else {
                    setWishlist(false);
                }
            })
        }
        else {
            setWishlist(false);
        }
    }
    useEffect(() => {
        productFetch();
        productExists();
    })
    useEffect(() => {
        checkWishlist();
    }, [wishlist])
    const productExists = async () => {
        if (token) {
            await axios.get(`http://localhost:3003/cart/checkcart/${params.id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then((res) => {
                if (res.data.msg == "Product already exists in cart") {
                    setProductExist(true);
                }
                else if (res.data.msg == "Product doesn't exist in cart") {
                    setProductExist(false);
                }
                else {
                    setProductExist(false);
                }
            })
        }
    }

    const addToCart = async () => {
        if (token) {
            await axios.get(`http://localhost:3003/cart/add/${params.id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then((res) => {
                console.log(res);
                toast('product added to cart')
                setProductExist(true);
            })
        }
        else {
            toast.error('Login is required');
        }
    }


    const wishlistProduct = async (id) => {
        if (token) {
            if (wishlist) {
                await axios.delete('http://localhost:3003/wishlist/remove', id).then(() => {
                    setWishlist(false);
                }).catch((err) => { console.log(err); })
            }
            else {
                await axios.get(`http://localhost:3003/wishlist/add/${params.id}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                }).then((res) => {
                    console.log(res);
                    setWishlist(true);
                }).catch((err) => { console.log(err); })
            }
        }
        else {
            toast.error('Login is required')
        }
    }

    return (
        loading ?
            <div className='w-full flex justify-center items-center '>
                <Loader />
            </div>
            :
            <div className='flex flex-col md:flex-row justify-evenly items-start'>
                <div className='w-full flex flex-row md:sticky md:top-0'>
                    <div className="flex flex-col w-1/2">
                        <img className='cursor-pointer m-2' src={`/uploads/${curProduct.image1}`} alt="image" onClick={() => { setDisplay(`/uploads/${curProduct.image1}`) }} />
                        <img className='cursor-pointer m-2' src={`/uploads/${curProduct.image2}`} alt="image" onClick={() => { setDisplay(`/uploads/${curProduct.image2}`) }} />
                    </div>
                    <div>
                        <img className='h-full' src={display ? display : `/uploads/${curProduct.image1}`} alt="image" />
                    </div>
                </div>
                <div className="w-full p-5">
                    <div className='flex flex-col'>
                        <p className='text-rose-500 text-xl font-mono uppercase'><i className='fa fa-fire-alt text-rose-500' /> Hot selling product <i className='fa fa-fire-alt text-rose-500'></i></p>
                        <h1 className='text-3xl md:text-6xl font-bold mt-1 flex flex-row justify-between items-center'>{curProduct.title} <span><i onClick={() => wishlistProduct(curProduct._id)} className={`${wishlist ? 'fa text-[red]' : 'fa-regular'} fa-heart cursor-pointer mx-3 md:text-5xl text-3xl`} /></span></h1>
                    </div>
                    <div className='text-gray-600 font-semibold m-3 uppercase'>
                        <p>category: {curProduct.category}</p>
                        <p>type: {curProduct.type}</p>
                    </div>

                    <p className='font-bold text-3xl text-gray-700 m-3 mb-8'>{curProduct.price}₹<span className='line-through text-sm'>{curProduct.price * 2}₹</span></p>

                    <div className="px-4 ">
                        <div className="">
                            <div className='mb-8'>
                                <h2
                                    className="w-16 pb-1 mb-4 text-2xl font-bold border-b-2 border-[#CDB4DB]">
                                    Description</h2>
                                <p>{curProduct.description}</p>
                            </div>
                            <div className="mb-8">
                                <h2
                                    className="w-16 pb-1 mb-4 text-2xl font-bold border-b-2 border-[#CDB4DB]">
                                    Colors</h2>
                                <div className="flex flex-wrap -mx-2 -mb-2">
                                    {curProduct.colors.map((val) => {
                                        return (
                                            <button className="p-1 mb-2 mr-3">
                                                <div className={`w-8 h-8 rounded-full bg-[${val}] border border-black`}></div>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2
                                    className="w-12 pb-1 mb-4 text-2xl font-bold border-b-2 border-[#CDB4DB]">
                                    Sizes</h2>
                                <div>
                                    <div className="flex flex-wrap -mx-2 -mb-2">
                                        {curProduct.sizes.map((val) => {
                                            return (
                                                <button
                                                    className="px-4 py-2 mb-2 mr-4 font-semibold border rounded-md hover:border-[purple] hover:text-[purple]">
                                                    {val}
                                                </button>)
                                        })}
                                    </div>
                                </div>
                            </div>
                            <Ratings />
                            <div className="flex flex-wrap items-center gap-4">
                                {productExist ? <Link to='/cart'
                                    className="w-full flex items-center justify-center p-4 bg-[purple] rounded-md lg:w-2/5 text-gray-50 hover:bg-[#CDB4DB] hover:text-[purple] border-[purple] border ">
                                    Go to cart</Link>
                                    :
                                    loading ?
                                        <button
                                            className="w-full p-4 bg-[purple] rounded-md lg:w-2/5 text-gray-50 hover:bg-[#CDB4DB] hover:text-[purple] border-[purple] border ">
                                            <Loader />
                                        </button>
                                        :
                                        <button onClick={addToCart}
                                            className="w-full p-4 bg-[purple] rounded-md lg:w-2/5 text-gray-50 hover:bg-[#CDB4DB] hover:text-[purple] border-[purple] border ">
                                            Add to cart</button>}
                                {token ?
                                    <Link to='shipping'
                                        className="flex items-center justify-center w-full p-4 text-[purple] border border-[purple] rounded-md lg:w-2/5  hover:bg-[#CDB4DB] hover:border-[purple]">
                                        Buy Now
                                    </Link>
                                    : <button onClick={() => toast.error('Login is required')}
                                        className="flex items-center justify-center w-full p-4 text-[purple] border border-[purple] rounded-md lg:w-2/5  hover:bg-[#CDB4DB] hover:border-[purple]">
                                        Buy Now
                                    </button>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    )
}

export default ProductRedirect