import React, { useEffect, useState } from 'react'
import img from '../images/pexels-photo-8386643.jpeg'
import { useAuth } from '../context/useAuth'
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    message: ''
});
  const notify = (message)=>{
    toast(message, {
      icon: "🚀"
    });
  }
  const handleChange = (e)=>{
      setContact({...contact, [e.target.name]: e.target.value});
  }
  const sendMessage = (e)=>{
      e.preventDefault();
      const {name, email, message} = contact;
      if(name && email && message){
      axios.post('https://chicdrobe.onrender.com/connect/contact',contact).then((res)=>{
          console.log(res.data);
          notify('Message Sent')
          setContact({
            name: '',
            email: '',
            message: ''
          })
      }).catch((err)=>{console.log(err);})}
      else{
        alert('One or more fields empty')
      }
  }
  return (
    <>
     <h1 className="text-4xl text-center font-bold mt-5">CONTACT US</h1>
    <div className="contact flex flex-col sm:flex-row justify-evenly items-center">
        <div className="sm:w-1/2 w-full m-5">
            <img src={img} alt="store image"/>
        </div>
        <div className="sm:w-1/2 w-full">
            <form className="form flex flex-col px-2 py-2 m-5 rounded-lg" onSubmit={sendMessage}>
                <label htmlhtmlFor="name" className="pl-2 font-medium">Name:</label>
                <input type="text" id="name" name='name' className="m-2 px-3 py-1 border-1 border-[#CDB4DB] rounded-lg " placeholder="Enter Your Name" required value={contact.name} onChange={(e)=>{handleChange(e)}}/>
                <label htmlhtmlFor="mail" className="pl-2 font-medium">Email:</label>
                <input type="email" id="mail" name='email' className="m-2 px-3 py-1" placeholder="Enter Your Email" value={contact.email} required onChange={(e)=>{handleChange(e)}}/>
                <label htmlhtmlFor="msg" className="pl-2 font-medium">Message:</label>
                <textarea name="message" id="msg" cols="10" className="m-2 px-3 py-1" rows="7" style={{resize: "none"}} required  placeholder="Enter Your Message" onChange={(e)=>{handleChange(e)}} value={contact.message}></textarea>
                <button type='submit' className="self-center m-3 px-3 py-1 text-xl font-semibold rounded-lg">Send Message</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default Contact