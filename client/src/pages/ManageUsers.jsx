import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import Loader from '../components/Loader';
import {toast} from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
      axios.get('https://chicdrobe.onrender.com/edit/allusers').then((res)=>{
          setUsers(res.data.users);
          console.log(res.data.users);
          setLoading(false);
      }).catch((err)=>{console.log(err)})
  })

  return (
    loading ? 
      <div className='w-full flex justify-center items-center '>
      <Loader />
  </div> : 
    <div className="mx-auto w-full px-4 py-8 sm:px-8 h-screen flex flex-col justify-evenly">
    <div className="overflow-y-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-purple-500 text-left text-xs font-semibold uppercase tracking-widest text-white">
              <th className="px-5 py-3">Sr No.</th>
              <th className="px-5 py-3">First Name</th>
              <th className="px-10 py-3">Last Name</th>
              <th className="px-5 py-3">Phone Number</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Is Admin</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          {users.slice(count, count + 3).map((val, i) => {
            return (
              <>
                <tbody className="text-gray-500">
                  <tr>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-center">{i + 1}</p>
                    </td>
                    
                    <td className="border-b border-gray-200 bg-white px-10 py-5 text-sm">
                      <p className="whitespace-no-wrap">{val.firstName}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{val.lastName}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{val.phoneNumber}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{val.email}</p>
                    </td>
                    <td className={`border-b border-gray-200 bg-white px-5 py-5 text-sm`}>
                      <p className={`whitespace-no-wrap text-center rounded-full px-3 py-1 text-xs font-semibold ${val.isAdmin ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>{val.isAdmin ? "Yes" : "No"}</p>
                    </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <button className=" rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900" onClick={async()=>{
                          await axios.delete(`https://chicdrobe.onrender.com/admin/deluser/${val._id}`).then((res)=>{
                            toast.success("User deleted");
                            console.log(res);
                          }).catch((err)=>{toast.error(err.message)})
                        }}>Delete User</button>
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
    <div className="flex flex-row">
      <ReactPaginate className="flex border border-purple-400 w-full flex-row justify-center items-center" pageClassName="p-2 m-2" activeClassName="px-4 rounded-full bg-purple-400" onPageChange={(e) => setCount((e.selected * 3) % users.length)} pageRangeDisplayed={1} marginPagesDisplayed={2} breakLabel="..." renderOnZeroPageCount={null} pageCount={users.length / 3} previousClassName='' />
    </div>
    </div>
  )
}

export default ManageUsers