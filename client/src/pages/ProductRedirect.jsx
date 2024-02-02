import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Ratings from '../components/Ratings';
import { toast } from 'react-toastify';
import { useAuth } from '../context/useAuth';
import Loader from '../components/Loader'
import { useOrder } from '../context/useOrder';

const ProductRedirect = () => {
    const [wishlist, setWishlist] = useState(false);
    const { token } = useAuth();
    const { setPlaceOrder, placeOrder, orderHistory, orders } = useOrder();
    const products = orders.map((val)=>{
        return val.products;

    })
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
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
        colors: [],
        quantity: 1
    });
    const [data, setData] = useState({
        productID: "",
        size: "",
        color: "",
        quantity: "1"
    })
    const [productExist, setProductExist] = useState(false);
    const [display, setDisplay] = useState();
    const params = useParams();
    const productFetch = async () => {
        await axios.get(`https://chicdrobe.onrender.com/products/redirect/${params.id}`).then((res) => {
            setCurProduct(res.data.product);
            setLoading(false);
        }).catch((err) => { console.log(err); })
    }
    const checkWishlist = async () => {
        if (token) {
            await axios.get(`https://chicdrobe.onrender.com/wishlist/check/${params.id}`, {
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
        orderHistory();
        console.log(products);
    })
    useEffect(() => {
        checkWishlist();
    }, [wishlist])
    const productExists = async () => {
        if (token) {
            await axios.get(`https://chicdrobe.onrender.com/cart/checkcart/${params.id}`, {
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
            await axios.post(`https://chicdrobe.onrender.com/cart/add/${curProduct._id}`, data, {
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
                await axios.delete('https://chicdrobe.onrender.com/wishlist/remove', id).then(() => {
                    setWishlist(false);
                }).catch((err) => { console.log(err); })
            }
            else {
                await axios.get(`https://chicdrobe.onrender.com/wishlist/add/${params.id}`, {
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

    const buyNow = async () => {
        const { productID, size, color, quantity } = data;
        if (productID && size && color) {
            try {
                await axios.get(`https://chicdrobe.onrender.com/products/getproduct/${productID}`).then((res)=>{
                    let product = res.data.product;
                    setPlaceOrder({ ...placeOrder, ["products"]: [{product, size, color, quantity}] });
                    console.log(placeOrder);
                    navigate('shipping');
                })
            } catch (error) {
                console.log(error);
            }
        }
        else {
            toast.error("Select size and color")
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
                    <div className="flex flex-col w-2/3 sm:w-1/2">
                        <img className='cursor-pointer m-1 sm:m-2' src={`/uploads/${curProduct.image1}`} alt="image" onClick={() => { setDisplay(`/uploads/${curProduct.image1}`) }} />
                        <img className='cursor-pointer m-1 sm:m-2' src={`/uploads/${curProduct.image2}`} alt="image" onClick={() => { setDisplay(`/uploads/${curProduct.image2}`) }} />
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
                            <form onSubmit={(e) => { e.preventDefault() }}>
                                <div className="mb-8">
                                    <h2
                                        className="w-16 pb-1 mb-4 text-2xl font-bold border-b-2 border-[#CDB4DB]">
                                        Colors</h2>
                                    <div className="flex flex-wrap -mx-2 -mb-2">
                                        {curProduct.colors.map((val, i) => {
                                            return (
                                                <div onClick={() => { console.log(data); }} className='relative flex w-16 mt-5 items-center justify-center  px-4 py-2 mb-2 mr-4 font-semibold'>
                                                    <input className="peer hidden" value={val} onClick={(e) => {
                                                        setData({ ...data, ["productID"]: curProduct._id, ["color"]: e.target.value })
                                                    }} type="radio" name="color" id={`color${i}`} required />
                                                    <label className={`w-8 cursor-pointer h-8 rounded-full bg-[${val}] border border-black peer-checked:border-transparent peer-checked:ring-4 peer-checked:ring-purple-600 absolute left-4 h-5 w-5 rounded-full border-2`} htmlFor={`color${i}`}> </label>
                                                </div>

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
                                            {curProduct.sizes.map((val, i) => {
                                                return (
                                                    <div onClick={() => { console.log(data); }} className='relative flex w-32 items-center justify-center  px-4 py-2 mb-2 mr-4 font-semibold border rounded-md hover:border-[purple] hover:text-[purple]'>
                                                        <input className="peer hidden" value={val} onClick={(e) => {
                                                            setData({ ...data, ["productID"]: curProduct._id, ["size"]: e.target.value })
                                                        }} type="radio" name="framework" id={`framework${i}`} required />
                                                        <label className="peer-checked:border-purple-600 absolute top-0 h-full w-full cursor-pointer rounded-md border" htmlFor={`framework${i}`}> </label>
                                                        <div className="peer-checked:border-transparent peer-checked:bg-purple-600 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-purple-600 ring-offset-2"></div>
                                                        <span>{val}</span>
                                                    </div>

                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                {}
                                <Ratings /> 
                                <div className="flex flex-wrap items-center gap-4">
                                    {productExist ? <Link to='/cart'
                                        className="w-full flex items-center justify-center p-4 bg-[purple] rounded-md lg:w-2/5 text-gray-50 hover:bg-[#CDB4DB] hover:text-[purple] border-[purple] border ">
                                        Go to cart</Link>
                                        :
                                        loading ?
                                            <button type='submit'
                                                className="w-full p-4 bg-[purple] rounded-md lg:w-2/5 text-gray-50 hover:bg-[#CDB4DB] hover:text-[purple] border-[purple] border ">
                                                <Loader />
                                            </button>
                                            :
                                            <button type='submit' onClick={() => {
                                                const { productID, size, color } = data;
                                                if (productID && size && color) {
                                                    addToCart()
                                                }
                                                else {
                                                    toast.error('Select color and size')
                                                }
                                            }}
                                                className="w-full p-4 bg-[purple] rounded-md lg:w-2/5 text-gray-50 hover:bg-[#CDB4DB] hover:text-[purple] border-[purple] border ">
                                                Add to cart</button>}
                                    {token ?
                                        <button type='submit' onClick={buyNow}
                                            className="flex items-center justify-center w-full p-4 text-[purple] border border-[purple] rounded-md lg:w-2/5  hover:bg-[#CDB4DB] hover:border-[purple]">
                                            Buy Now
                                        </button>
                                        : <button type='submit' onClick={() => toast.error('Login is required')}
                                            className="flex items-center justify-center w-full p-4 text-[purple] border border-[purple] rounded-md lg:w-2/5  hover:bg-[#CDB4DB] hover:border-[purple]">
                                            Buy Now
                                        </button>}
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
    )
}

export default ProductRedirect