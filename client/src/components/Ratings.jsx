
import React, { useState } from 'react'
import { useAuth } from '../context/useAuth';
import {toast} from 'react-toastify';

const Ratings = () => {
    const [totalRating, setTotalRating] = useState(0);
    const [review, setReview] = useState();
    const [rating, setRating] = useState([{
        name: "fa-regular",
        rate: 1
    },
    {
        name: "fa-regular",
        rate: 2
    },
    {
        name: "fa-regular",
        rate: 3
    },
    {
        name: "fa-regular",
        rate: 4
    },
    {
        name: "fa-regular",
        rate: 5
    }
    ]);
    const {token} = useAuth();
    const giveRating = (i) => {
        for (let j = 0; j < rating[i].rate; j++) {
            rating[j].name = 'fa text-yellow-500'
        }
        let me = rating.filter((val)=>{
            return val.name == "fa text-yellow-500"
        })
        setTotalRating(me.length);
    }
    const submitRating = async(e)=>{
        e.preventDefault();
        try {
            if(token){
                if(totalRating != 0){
                console.log(totalRating, review);
                toast('Rated Successfully',{
                    icon: "🚀"
                  })}
                else{
                    toast.error('Rate First');
                }
            }
            else{
                toast.error('Login Required')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form className='flex flex-col m-5' onSubmit={submitRating}>
            <div className='flex flex-row justify-evenly items-center text-4xl m-5'>
                {/* No Rating Star */}
                {rating.map((val, i) => {
                    return (
                        <>
                        <i className={`${val.name} fa-star cursor-pointer`} key={i} onClick={(e) => giveRating(i)} />
                        
                        </>
                    )
                })}
            </div>
            <textarea name="" id="" className='m-2 border-[#CDB4DB] border-2 p-2' onChange={(e)=>{setReview(e.target.value)}} required style={{resize: "none"}} cols="40" rows="5" placeholder='Write your review...'></textarea>
            <div className=' self-end p-2 font-semibold border-2 rounded-md border-[#CDB4DB]'>
                <button type='submit'>
                    Submit rating</button>
            </div>
        </form>
    )
}

export default Ratings