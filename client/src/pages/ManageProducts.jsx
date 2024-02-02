import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import { useProduct } from '../context/useProducts'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ManageProducts = () => {
  let { products, getAllProducts } = useProduct();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  useEffect(() => {
    getAllProducts();
  })

  return (
    <div className="mx-auto w-full px-4 py-8 sm:px-8 h-screen flex flex-col justify-evenly">
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-purple-500 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-5 py-3">Sr No.</th>
                <th className="px-5 py-3">Product Name</th>
                <th className="px-10 py-3">Unit Price</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3">Action</th>
                <th className="px-5 py-3">Action</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            {products.slice(count, count + 3).map((val, i) => {
              return (
                <>
                  <tbody className="text-gray-500">
                    <tr>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap text-center">{i + 1}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <div className="flex items-center">
                        <div className="h-20 w-15 flex-shrink-0">
                            <img className="h-full w-full rounded-lg" src={`/uploads/${val.image1}`} alt="" />
                          </div>
                          <div className="ml-3">
                            <p className="whitespace-no-wrap">{val.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-10 py-5 text-sm">
                        <p className="whitespace-no-wrap">{val.price}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <span className="whitespace-no-wrap">{val.stock}</span>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <button className=" rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900" onClick={()=>{navigate(`/allproducts/${val._id}`)}}>View</button>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <button className=" rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900" onClick={()=>{navigate(`${val._id}`)}}>Update</button>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <button className=" rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900" 
                          onClick={()=>{axios.delete(`http://192.168.1.109:3003/products/delete/${val._id}`)
                          .then((res)=>{toast(res.data.msg)})
                          .catch((err)=>{console.log(err);})}}>Delete</button>
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
        <ReactPaginate className="flex border border-purple-400 w-full flex-row justify-center items-center" pageClassName="p-2 m-2" activeClassName="px-4 rounded-full bg-purple-400" onPageChange={(e) => setCount((e.selected * 3) % products.length)} pageRangeDisplayed={1} marginPagesDisplayed={2} breakLabel="..." renderOnZeroPageCount={null} pageCount={products.length / 3} previousClassName='' />
      </div>
      </div>
      )
}

      export default ManageProducts