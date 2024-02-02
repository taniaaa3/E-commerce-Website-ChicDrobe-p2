import React, {useEffect, useState} from 'react'
import { useAuth } from '../context/useAuth';
import {toast} from 'react-toastify';
import axios from 'axios';

const Edit = () => {
    const {fetchUser, userData} = useAuth();
    const [data, setData] = useState({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber
    })
    useEffect(()=>{
        fetchUser();
    })
    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setData({...data, [name]:value})
    }

    const updateUser = async(e)=>{
        e.preventDefault();
        try {
            let res = await axios.put('https://chicdrobe.onrender.com/edit/user',{
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName
            })
            if(res.status == 200){
                let data = res.data;
                console.log(data);
                toast('User Updated')
            }
            else{
                toast.error('User not updated');
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <form className='w-full m-5 p-5 form self-center' onSubmit={(e)=>updateUser(e)}>
        <div className='m-2'>
        <label htmlhtmlFor="firstName">First Name: </label>
        <input type="text" name='firstName' className='block sm:inline border-[#CDB4DB] border rounded-lg p-2' value={data.firstName} onChange={(e)=>{handleChange(e)}}/>
       </div>
       <div className='m-2'>
        <label htmlhtmlFor="lastName">Last Name: </label>
        <input type="text" name='lastName' className=' block sm:inline border-[#CDB4DB] border rounded-lg p-2' value={data.lastName} onChange={(e)=>{handleChange(e)}}/>
        </div>
        <div className='m-2'>
        <label htmlhtmlFor="email">Email: </label>
        <input type="text" name='email' readOnly className='block sm:inline border-[#CDB4DB] border rounded-lg p-2' value={data.email}/>
        </div>
        <div className='m-2'>
        <label htmlhtmlFor="phoneNumber">Phone Number: </label>
        <input type="text" name='phoneNumber' readOnly className='block sm:inline border-[#CDB4DB] border rounded-lg p-2' value={data.phoneNumber}/>
   </div>
    <p className='text-slate-500 text-xs '>* email & phone number cannot be edited. *</p>
        <button className="self-center m-3 px-3 py-1 text-xl font-semibold rounded-lg border border-[#CDB4DB] hover:bg-[#CDB4DB]" type='submit'>Update</button>
    </form>
  )
}

export default Edit