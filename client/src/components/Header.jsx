import React, { useEffect, useState } from 'react'
// import '../css/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCaretDown, faBarsStaggered, faXmark, faUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import axios from 'axios';
import { useProduct } from '../context/useProducts';

const Header = () => {
    const [toggle, setToggle] = useState(false);
    const [userToggle, setUserToggle] = useState(false);
    const [cart, setCart] = useState([]);
    const { token, userData, fetchUser } = useAuth();
    const {search, setSearch, setSearchProducts, loading, setLoading} = useProduct();
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            fetchUser();
            fetchCart();
        }
    })
    const toggleMenu = () => {
        if (toggle) {
            setToggle(false);
        }
        else {
            setToggle(true);
        }
    }
    const searchProduct = async()=>{
        if(search){
            setLoading(true);
            await axios.post("https://chicdrobe.onrender.com/products/search",{search},{
                headers: {"Content-Type":"application/json"}
            }).then((res)=>{
                    setSearchProducts(res.data.product);
                    console.log(res.data);
                    navigate('/search')
                    setLoading(false);
            }).catch((err)=>{console.log(err.response); setLoading(false);})
        }
        else{
            toast.error("Search field empty");
        }
    }
    const fetchCart = async()=>{
        await axios.get('https://chicdrobe.onrender.com/cart/get',{
            headers: {"Authorization":`Bearer ${token}`}
        }).then((res)=>{
            setCart(res.data.cart)
        }).catch((err)=>{console.log(err);})
    }
    return (
        <>
            <div className="header p-3 flex flex-row items-center justify-evenly">
                <h1 className="text-4xl font-bold chicdrobe">ChicDrobe</h1>
                <div className="searchbar md:block hidden p-0">
                    <input type="text" className="m-0 rounded-tr-lg rounded-bl-lg p-1" placeholder='SEARCH PRODUCT NAME' value={search} onChange={(e)=>{setSearch(e.target.value);}}/>
                    <button className="border-2 m-0 border-[purple] rounded-tr-lg rounded-bl-lg px-2" onClick={searchProduct}>Search</button>
                </div>
                <div className="logbar flex hidden md:block justify-evenly items-center">
                    {token == null ?
                        <>
                            <NavLink to='/login' className="px-2 mx-2 pink-gradient rounded-lg text-2xl">Login</NavLink>
                            <NavLink to='/register' className="px-2 mx-2 pink-gradient rounded-lg text-2xl">Register</NavLink>
                        </> :
                        <div className='flex flex-row '>
                            <NavLink to='/logout' className="px-2 mx-2 pink-gradient rounded-lg text-2xl">Logout</NavLink>
{/* <NavLink to='/cart' className="px-2 fa fa-cart-shopping text-xl md:text-2xl fa-gradient" /> */}
<NavLink to="/cart" class="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
  <p class="relative flex">
    <i className='px-2 fa fa-cart-shopping text-xl md:text-2xl fa-gradient'></i>
      <span class="absolute right-0 -top-1 rounded-full bg-rose-700 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">{cart.length}
    </span>
  </p>
</NavLink>
                            
                            {userData.isAdmin 
                            ? 
                            
                            <div className='dropdown'>
                            <button onClick={()=>userToggle ? setUserToggle(false) : setUserToggle(true)} className={`fa-gradient px-2 text-xl md:text-2xl`}><i className="fa fa-user" /><span>{userData.firstName}</span>
                            
                            </button> 
                            <ul className={`${userToggle ? "absolute" : "hidden"} z-10 m-1 flex flex-col`}>
                                <NavLink to='/admin/dashboard' onClick={()=>setUserToggle(false)} className='bg-white p-2 border border-b-black cursor-pointer hover:bg-gray-200'>Admin Dashboard</NavLink>
                                <NavLink to='/user' onClick={()=>setUserToggle(false)} className='bg-white p-2 border border-b-black cursor-pointer hover:bg-gray-200'>User Settings</NavLink>
                                </ul>
                            </div>
                            : <NavLink to='/user' className='fa-gradient px-2 text-xl md:text-2xl'><i className="fa fa-user" /><span>{userData.firstName}</span></NavLink>
}
                        </div>}
                </div>
                <FontAwesomeIcon icon={toggle ? faXmark : faBarsStaggered} fontSize='25' className='md:hidden cursor-pointer' onClick={toggleMenu} />
            </div >
            {
                toggle ?
                    <div className='header p-3 flex flex-col md:hidden items-center justify-evenly'>
                        < div className="searchbar p-0 mb-5" >
                            <input type="text" className="m-0 rounded-tr-lg rounded-bl-lg p-1" placeholder='SEARCH PRODUCT NAME' value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                            <button className="border-2 m-0 border-[purple] rounded-tr-lg rounded-bl-lg px-2" onClick={searchProduct}>Search</button>
                        </div >
                        <div className="logbar flex justify-evenly items-center">
                            {token == null ?
                                <>
                                    <NavLink to='/login' className="px-2 mx-2 pink-gradient rounded-lg text-2xl">Login</NavLink>
                                    <NavLink to='/register' className="px-2 mx-2 pink-gradient rounded-lg text-2xl">Register</NavLink>
                                </> :
                                <>
                                    <NavLink to='/logout' className="px-2 mx-2 pink-gradient rounded-lg text-2xl">Logout</NavLink>

                                    {/* <NavLink to='/cart' className="px-2 fa fa-cart-shopping text-2xl fa-gradient" /> */}
                                    <NavLink to="/cart" class="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
  <p class="relative flex">
    <i className='px-2 fa fa-cart-shopping text-2xl fa-gradient'></i>
      <span class="absolute right-0 -top-1 rounded-full bg-rose-700 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">{cart.length}
    </span>
  </p>
</NavLink>
                                    {userData.isAdmin 
                            ? 
                            
                            <div className='dropdown'>
                            <button onClick={()=>userToggle ? setUserToggle(false) : setUserToggle(true)} className={`fa-gradient px-2 text-xl md:text-2xl`}><i className="fa fa-user" /><span>{userData.firstName}</span>
                            
                            </button> 
                            <ul className={`${userToggle ? "absolute" : "hidden"} z-10 m-1 flex flex-col`}>
                                <NavLink to='/admin/dashboard' onClick={()=>setUserToggle(false)} className='bg-white p-2 border border-b-black cursor-pointer hover:bg-gray-200'>Admin Dashboard</NavLink>
                                <NavLink to='/user' onClick={()=>setUserToggle(false)} className='bg-white p-2 border border-b-black cursor-pointer hover:bg-gray-200'>User Settings</NavLink>
                                </ul>
                            </div>
                            : <NavLink to='/user' className='fa-gradient px-2 text-xl md:text-2xl'><i className="fa fa-user" /><span>{userData.firstName}</span></NavLink>}
                                </>}
                        </div>
                    </div > : ''}
            <div className="header flex flex-row flex-wrap justify-evenly items-start p-3 ">
                <NavLink to='/' className="hover:text-white">Home</NavLink>
                <NavLink className="hover:text-white" to='/allproducts'>All Products</NavLink>
                <h1 className="dropdown hover:text-white cursor-pointer">Women <FontAwesomeIcon icon={faCaretDown} />
                    <ul className=" p-2 hidden text-white dropdown-child">
                        <NavLink to='/women/all' className="hover:text-black"><li>All Products</li></NavLink>
                        <NavLink to="/women/dress" className="hover:text-black"><li>Dresses</li></NavLink>
                        <NavLink to="/women/pants" className="hover:text-black"><li>Pants</li></NavLink>
                        <NavLink to="/women/skirts" className="hover:text-black"><li>Skirts</li></NavLink>
                    </ul>
                </h1>
                <h1 className="dropdown hover:text-white cursor-pointer">Men <FontAwesomeIcon icon={faCaretDown} />
                    <ul className=" p-2 text-white hidden dropdown-child">
                        <NavLink to='/men/all' className="hover:text-black"><li>All Products</li></NavLink>
                        <NavLink to="/men/shirts" className="hover:text-black"><li>Shirts</li></NavLink>
                        <NavLink to="/men/pants" className="hover:text-black"><li>Pants</li></NavLink>
                        <NavLink to="/men/hoodies" className="hover:text-black"><li>Hoodies</li></NavLink>
                    </ul>
                </h1>
                <NavLink to="/kids" className={`hover:text-white`}>Kids</NavLink>
                <NavLink to='/contact' className={`hover:text-white`}>Contact</NavLink>
            </div>

        </>
    )
}

export default Header