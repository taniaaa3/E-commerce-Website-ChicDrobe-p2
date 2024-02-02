import React, { useEffect, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import ManageOrders from './ManageOrders';
import ManageUsers from './ManageUsers';
import ManageProducts from './ManageProducts'
import { useProduct } from '../context/useProducts';
import { useOrder } from '../context/useOrder';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const { userData } = useAuth();
  const { getAllProducts, products } = useProduct();
  const { adminPanelOrders, orders } = useOrder();
  const [cancelled, setCancelled] = useState(0);
  const [active, setActive] = useState(0);
  const [returned, setReturn] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    if (!userData.isAdmin) {
      navigate('/');
    }
  })

  useEffect(() => {
    getAllProducts();
    adminPanelOrders();
    setCancelled(orders.filter((val) => {
      return val.status == "Cancelled";
    }).length)
    setReturn(orders.filter((val) => {
      return val.status == "Return";
    }).length)
    setDelivered(orders.filter((val) => {
      return val.status == "Delivered";
    }).length)
    setActive(orders.filter((val) => {
      return val.status == "Active";
    }).length)
    axios.get('https://chicdrobe.onrender.com/edit/allusers').then((res) => {
      setUsers(res.data.users);
    }).catch((err) => { console.log(err) })
  })

  return (
    <>
      <div className='block md:hidden text-center m-2'>
        <h1 className='font-bold text-2xl'>OPEN ON DESKTOP TO ACCESS ADMIN DASHBOARD</h1>
      </div>
      <div className='md:flex-row w-full hidden md:flex '>
        <AdminSidebar />
        <div className="overflow-y-hidden h-screen w-full  bg-gray-50">
          <div className=''>
            {window.location.pathname == "/admin/dashboard" ?
              <div className='flex justify-center items-center h-screen'>
                <div className="text-slate-600 mx-auto grid max-w-2xl grid-cols-2 gap-y-4 px-4 py-1 sm:my-10 sm:rounded-md sm:border sm:shadow">
                  <div className="col-span-2 col-start-1 flex flex-col justify-between border-b py-3 sm:flex-row">
                    <p className="font-medium">Overview</p>
                  </div>
                  <div className="col-span-2 mb-5 -mx-4 bg-gradient-to-t from-purple-900 to-purple-400 px-4 py-8 sm:col-span-1 sm:mx-0 sm:rounded-xl sm:py-4">
                    <p className="mb-4 font-medium text-black">Cases in pipeline</p>
                    <div className="mb-6 flex max-w-xs">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-400 sm:mr-3 sm:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      </div>
                      <div className="px-4">
                        <p className="uppercase text-xl font-black text-white">Order history</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between">
                      <div className="flex flex-col items-center px-4 py-1">
                        <p className="text-lg font-medium text-white">{active}</p>
                        <p className="text-xs font-medium text-indigo-100">Active</p>
                      </div>
                      <div className="mb-1 flex flex-col items-center px-4 py-1 sm:mr-1 sm:mb-0">
                        <p className="text-lg font-medium text-white">{delivered}</p>
                        <p className="text-xs font-medium text-indigo-100">Delivered</p>
                      </div>
                      <div className="mb-1 flex flex-col items-center rounded-2xl px-4 py-1 sm:mr-1 sm:mb-0">
                        <p className="text-lg font-medium text-white">{cancelled}</p>
                        <p className="text-xs font-medium text-indigo-100">Cancelled</p>
                      </div>
                      <div className="flex flex-col items-center px-4 py-1">
                        <p className="text-lg font-medium text-white">{returned}</p>
                        <p className="text-xs font-medium text-indigo-100">Returned</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 grid grid-cols-2 gap-4 py-4 sm:col-span-1 sm:gap-8 sm:px-4">
                    <div className="">
                      <p className="text-lg font-bold">{products.length}</p>
                      <span className="bg-slate-200 text-slate-600 rounded-full px-2 py-0.5 text-xs font-medium">Products</span>
                    </div>
                    <div className="">
                      <p className="text-lg font-bold">{users.length}</p>
                      <span className="rounded-full bg-indigo-200 px-2 py-0.5 text-xs font-medium text-indigo-600">Users</span>
                    </div>
                    <div className="">
                      <p className="text-lg font-bold">{orders.length}</p>                      <span className="rounded-full bg-yellow-200 px-2 py-0.5 text-xs font-medium text-yellow-700">Orders</span>
                    </div>
                    <div className="">
                      <p className="text-lg font-bold">{cancelled}</p>
                      <span className="rounded-full bg-green-200 px-2 py-0.5 text-xs font-medium text-green-600">Cancelled</span>
                    </div>
                  </div>
                </div>
              </div>
              :
              window.location.pathname == "/admin/manageorders" ? <ManageOrders /> :
                window.location.pathname == "/admin/manageproducts" ? <ManageProducts /> :
                  window.location.pathname == "/admin/manageusers" ? <ManageUsers /> :
                    < ></>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin