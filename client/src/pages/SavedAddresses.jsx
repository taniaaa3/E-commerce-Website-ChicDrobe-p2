import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

const SavedAddresses = () => {
  const { token } = useAuth();
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [update, setUpdate] = useState({
    id: '',
    fullName: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    pincode: ''
  })
  

  // To get addresses
  const getAddresses = async () => {
    await axios.get('http://localhost:3003/edit/getaddresses', {
      headers: { "Authorization": `Bearer ${token}` }
    }).then((res) => {
      setAddress(res.data.addresses);
      setLoading(false);
    }).catch((err) => console.log(err))
  }

  // To update address
  const handleChange = (e)=>{
      let name = e.target.name;
      let value = e.target.value;

      setUpdate({...update, [name]:value})
      console.log(update);
  }
  const updateAddress = async(id)=>{
      
  }

  // To delete address
  const deleteAddress = async(id)=>{
      try {
        await axios.delete(`http://localhost:3003/edit/deleteaddress/${id}`).then((res)=>{
          toast('Address deleted');
        }).catch((err)=>{
          toast.error('Address not deleted')
        })
      } catch (error) {
        console.log(error);
      }
  }
  useEffect(() => {
    getAddresses();
  })

  return (
    <>
      {loading ?
        <div className='w-full flex justify-center items-center '>
          <Loader />
        </div>
        :
        <div className="flex flex-col m-3 justify-start items-center">
        <div className="mx-auto w-full px-4 py-8 sm:px-8">
          <div className="overflow-y-hidden rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-500 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Address</th>
                    <th className="px-5 py-3">Phone Number</th>
                    <th className="px-5 py-3">City</th>
                    <th className="px-5 py-3">State</th>
                    <th className="px-5 py-3">Pincode</th>
                    <th className="px-5 py-3 text-center">Action</th>
                  </tr>
                </thead>
                {address.map((val, i) => {
                  return (
                    <>
                      <tbody className="text-gray-500">
                        <tr>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            {toggle ? <input className="whitespace-no-wrap border border-[#CDB4DB] px-3 py-2 m-1 rounded-lg w-24" name='fullName' value={val.fullName} onChange={(e)=>{handleChange(e)}}/>
                            : <p className="whitespace-no-wrap">{val.fullName}</p>}
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          {toggle ? <>
                          <input className="whitespace-no-wrap border border-[#CDB4DB] px-3 py-2 m-1 rounded-lg w-28" name="address1" value={val.address1} onChange={(e)=>{handleChange(e)}}/>
                          <input className="whitespace-no-wrap border border-[#CDB4DB] px-3 py-2 m-1 rounded-lg w-28" name="address2" value={val.address2} onChange={(e)=>{handleChange(e)}}/>
                          </>
                            : <p className="whitespace-no-wrap">{`${val.address1} ${val.address2}`}</p>}
                          </td>


                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          {toggle ? <input className="whitespace-no-wrap border border-[#CDB4DB] px-3 py-2 m-1 rounded-lg w-24" name='phoneNumber' value={val.phoneNumber} onChange={(e)=>{handleChange(e)}}/>
                            : <p className="whitespace-no-wrap">{val.phoneNumber}</p>}
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          {toggle ? <input className="whitespace-no-wrap border border-[#CDB4DB] px-3 py-2 m-1 rounded-lg w-24" name='city' value={val.city} onChange={(e)=>{handleChange(e)}}/>
                            : <p className="whitespace-no-wrap">{val.city}</p>}
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          {toggle ? <input className="whitespace-no-wrap border border-[#CDB4DB] px-3 py-2 m-1 rounded-lg w-24" name='state' value={val.state} onChange={(e)=>{handleChange(e)}}/>
                            : <p className="whitespace-no-wrap">{val.state}</p>}
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          {toggle ? <input className="whitespace-no-wrap border border-[#CDB4DB] px-3 py-2 m-1 rounded-lg w-24" name='pincode' value={val.pincode} onChange={(e)=>{handleChange(e)}}/>
                            : <p className="whitespace-no-wrap">{val.pincode}</p>}
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div className="flex flex-row w-full justify-evenly items-center">
                            <button onClick={() => { toggle ? setToggle(false) : setToggle(true) }} className=" rounded-full bg-red-200 px-3 py-2 text-xs font-semibold text-red-900 m-2"><i className='fa fa-edit'/></button>
                            <button onClick={() => { deleteAddress(val._id) }} className=" rounded-full bg-red-200 px-3 py-2 text-xs font-semibold text-red-900"><i className='fa fa-trash'/></button>
                            </div>
                          </td>
                          
                        </tr>
                      </tbody>
                    </>
                  )
                })}
              </table>
            </div>
          </div>
        </div>
        </div>
        }
    </>

  )
}

export default SavedAddresses