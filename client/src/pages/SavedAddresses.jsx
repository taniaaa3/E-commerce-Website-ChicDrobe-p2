import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate';

const SavedAddresses = () => {
  const { token } = useAuth();
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [count, setCount] = useState(0);
  const [update, setUpdate] = useState({
    _id: '',
    fullName: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: ''
  })


  // To get addresses
  const getAddresses = async () => {
    await axios.get('http://192.168.1.109:3003/edit/getaddresses', {
      headers: { "Authorization": `Bearer ${token}` }
    }).then((res) => {
      setAddress(res.data.addresses);
      setLoading(false);
    }).catch((err) => console.log(err))
  }


  const updateAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch('http://192.168.1.109:3003/edit/updateaddress', update, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {
        toast(res.data.msg);
        setLoading(false);
        setToggle(false);
      }).catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Address not updated")
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdate({ ...update, [name]: value });
  }

  const edit = async (val) => {
    setUpdate(val);
    if (toggle) {
      setToggle(false);
    }
    else if (!toggle) {
      setToggle(true);
    }
  }
  // To delete address
  const deleteAddress = async (id) => {
    try {
      await axios.delete(`http://192.168.1.109:3003/edit/deleteaddress/${id}`).then((res) => {
        toast('Address deleted');
      }).catch((err) => {
        toast.error('Address not deleted')
      })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if(!toggle){
    getAddresses();}
  })

  return (
    <>
      {loading ?
        <div className='w-full flex justify-center items-center self-center'>
          <Loader />
        </div>
        : address.length != 0 && toggle ?
          <div className="w-full sm:w-3/4 flex justify-center items-center flex-col">
            <div className='flex flex-row justify-center items-center m-5'>
              <h1 className="text-xl font-bold uppercase">Update Address</h1>
            </div>
            <form className="form flex flex-col px-2 py-2 m-2 rounded-lg" onSubmit={updateAddress}>
              <input type="text" id="name" name='fullName' value={update.fullName} onChange={(e) => { handleChange(e) }} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Full Name" required />
              <input type="text" id="phoneNumber" name='phoneNumber' value={update.phoneNumber} onChange={(e) => { handleChange(e) }} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Phone Number" required />
              <input type="text" name='pincode' value={update.pincode} onChange={(e) => { handleChange(e) }} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Pincode" required />
              <div className='flex flex-row justify-evenly'>
                <input type="text" name='state' value={update.state} onChange={(e) => { handleChange(e) }} className="w-1/2 m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="State" required />
                <input type="text" name='city' value={update.city} onChange={(e) => { handleChange(e) }} className="w-1/2 m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="City" required />
              </div>
              <input type="text" name='address1' value={update.address1} onChange={(e) => { handleChange(e) }} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="House No., Building Name" required />
              <input type="text" name='address2' value={update.address2} onChange={(e) => { handleChange(e) }} className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Road name, Area, Colony" required />

              <button type='submit' className="self-center m-3 px-3 py-1 text-xl font-semibold rounded-lg">Update Address</button>
            </form>
          </div> 
          : address.length != 0 && !toggle ?
            <div className="flex flex-col m-3  justify-start items-center ">
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
                                    <p className="whitespace-no-wrap">{val.fullName}</p>
                                  </td>
                                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap">{`${val.address1} ${val.address2}`}</p>
                                  </td>


                                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap">{val.phoneNumber}</p>
                                  </td>
                                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap">{val.city}</p>
                                  </td>
                                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap">{val.state}</p>
                                  </td>
                                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap">{val.pincode}</p>
                                  </td>
                                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <div className="flex flex-row w-full justify-evenly items-center">
                                      <button onClick={() => { edit(val) }} className=" rounded-full bg-red-200 px-3 py-2 text-xs font-semibold text-red-900 m-2"><i className='fa fa-edit' /></button>
                                      <button onClick={() => { deleteAddress(val._id) }} className=" rounded-full bg-red-200 px-3 py-2 text-xs font-semibold text-red-900"><i className='fa fa-trash' /></button>
                                    </div>
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
                <div className="flex flex-row mt-2">
                                        <ReactPaginate className="flex border border-purple-400 w-full flex-row justify-center items-center" pageClassName="p-2 m-2" activeClassName="px-4 rounded-full bg-purple-400" onPageChange={(e) => setCount((e.selected * 3) % address.length)} pageRangeDisplayed={1} marginPagesDisplayed={2} breakLabel="..." renderOnZeroPageCount={null} pageCount={address.length / 3} previousClassName='' />
                                    </div>
              </div>
            </div>
            :
            <div className='m-5 flex flex-col w-full justify-center items-center self-center'>
              <i className='fa fa-bag-shopping text-7xl m-2'></i>
              <h1 className='sm:text-5xl text-xl font-bold'>No Saved Addresses Found :(</h1>
            </div>
      }
    </>

  )
}

export default SavedAddresses