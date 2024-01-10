import React from 'react'
import { NavLink } from 'react-router-dom'
// import '../css/footer.css';

const Footer = () => {
    return (
        <div className="footer w-full bottom-0 p-2 text-center">
            <div className="sm:flex sm:flex-row grid grid-cols-2 justify-evenly">
                <ul>
                    <NavLink className="text-3xl" to="/women/all">Women</NavLink>
                    <li className="hover:text-white"><NavLink to='/women/dress'>Dresses</NavLink></li>
                    <li className="hover:text-white"><NavLink to='/women/pants'>Pants</NavLink></li>
                    <li className="hover:text-white"><NavLink to='/women/skirts'>Skirts</NavLink></li>
                </ul>
                <ul>
                    <NavLink className="text-3xl" to="/men/all">Men</NavLink>
                    <li className="hover:text-white"><NavLink to='/men/shirts'>Shirts</NavLink></li>
                    <li className="hover:text-white"><NavLink to='/men/pants'>Pants</NavLink></li>
                    <li className="hover:text-white"><NavLink to='/men/hoodies'>Hoodies</NavLink></li>
                </ul>
                <ul>
                    <NavLink to="/kids" className="text-3xl">Kids</NavLink>

                </ul>
                <ul>
                    <h1 className="text-3xl cursor-pointer">Links</h1>
                    <li className="hover:text-white"><NavLink to='/'>Home</NavLink></li>
                    <li className="hover:text-white"><NavLink to='/login'>Login</NavLink></li>
                    <li className="hover:text-white"><NavLink to='/contact'>Contact</NavLink></li>
                </ul>
            </div>
            <hr className="m-3 text-black"/>
                <div className="p-2 font-semibold">
                    Copyright ©ChicDrobe 2023-24
                </div>
        </div>
    )
}

export default Footer