import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    
            <div className=" flex h-screen w-96 flex-col bg-purple-900 text-white">
                <h1 className="mt-10 ml-10 text-3xl font-bold">Admin Panel</h1>
                <ul className="mt-20 space-y-3">
                <NavLink to="/admin/dashboard" className="admin relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-purple-600">
                        <span
                        ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg></span
                        ><span className="">Dashboard</span>
                        {window.location.pathname == "/admin/dashboard" ? 
                        <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                        <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
                    </svg> : ""}
                    </NavLink>
                    <NavLink to="/addproduct" className="admin relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-purple-600">
                        <span
                        ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></span
                        ><span className="">Create Product</span>
                    </NavLink>
                    <NavLink to="/admin/manageproducts" className="admin relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 hover:bg-purple-600 text-gray-300">
                        <span
                        ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg></span
                        ><span className="">Manage Products</span>
                        {window.location.pathname == "/admin/manageproducts" ? 
                        <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                        <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
                    </svg> : ""}
                    </NavLink>
                    <NavLink to="/admin/manageorders" className="admin relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-purple-600">
                        <span
                        ><i className='fa-solid fa-bag-shopping text-xl'/></span
                        ><span className="">Manage Orders</span>
                        {window.location.pathname == "/admin/manageorders" ? 
                        <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                        <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
                    </svg> : ""}
                    </NavLink>
                    <NavLink to="/admin/manageusers" className="admin relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-purple-600">
                        <span className="text-2xl"
                        ><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36">
                                <path fill="currentColor" d="M32 15h-1V9a1 1 0 0 0-1-1H6a1 1 0 0 1-1-.82v-.36A1 1 0 0 1 6 6h23.58a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3a3.08 3.08 0 0 0 0 .36v20.57A4.1 4.1 0 0 0 7.13 32H30a1 1 0 0 0 1-1v-6h1a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1Zm-3 15H7.13A2.11 2.11 0 0 1 5 27.93V9.88A3.11 3.11 0 0 0 6 10h23v5h-7a5 5 0 0 0 0 10h7Zm2-7h-9a3 3 0 0 1 0-6h9Z" className="clr-i-outline clr-i-outline-path-1" />
                                <circle cx="23.01" cy="20" r="1.5" fill="currentColor" className="clr-i-outline clr-i-outline-path-2" />
                                <path fill="none" d="M0 0h36v36H0z" /></svg></span
                        ><span className="">Manage Users</span>
                        {window.location.pathname == "/admin/manageusers" ? 
                        <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                        <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
                    </svg> : ""}
                    </NavLink>
                </ul>
            </div>
  )
}

export default AdminSidebar