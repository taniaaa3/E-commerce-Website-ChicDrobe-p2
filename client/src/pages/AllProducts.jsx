import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import { useProduct } from '../context/useProducts'
import Loader from '../components/Loader'

const AllProducts = () => {
    let {products, getAllProducts, loading} = useProduct();
    useEffect(()=>{
        getAllProducts();
    },[products])
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center w-full">
      {loading ? 
      <div className='w-full flex justify-center items-center '>
      <Loader/> 
      </div> 
       : products.map((val)=>{
            return <Product val={val}/>
        })}
    </div>
  )
}

export default AllProducts