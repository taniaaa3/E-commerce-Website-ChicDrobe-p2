import React, { useEffect } from 'react'
import { useAuth } from '../context/useAuth'

const Home = () => {
  const {token, userData, fetchUser} = useAuth();
  useEffect(()=>{
    if(token){
      fetchUser();
    }
  })
  return (
    <div className="home sm:h-[550px] h-[400px]">
        <div className="home-child w-full h-full flex flex-col justify-center items-center text-center">
          {token == null ? <p className="text-4xl sm:text-5xl md:text-7xl font-bold chicdrobe">ChicDrobe</p> :
          <p className="text-4xl sm:text-5xl md:text-7xl font-bold chicdrobe">Welcome to ChicDrobe, <span className='darl'> {userData.firstName} </span></p>}
            <p className="text-3xl sm:text-4xl md:text-6xl font-bold my-3 text-center chicdrobe">Your one stop to a <span
                    className="darl">Chic</span> Wardrobe</p>
            <p className="text-4xl font-bold darl">By Taniya Darwani</p>
        </div>
    </div>
  )
}

export default Home