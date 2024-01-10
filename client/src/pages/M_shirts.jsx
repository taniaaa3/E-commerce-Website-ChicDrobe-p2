import React, { useEffect, useState } from 'react'
import { useProduct } from '../context/useProducts'
import Product from '../components/Product';
import Loader from '../components/Loader'

const M_shirts = () => {
    const {products, getAllProducts, loading} = useProduct();
    const [shirts, setshirts] = useState([])
    useEffect(()=>{
        getAllProducts();
        setshirts( products.filter((val)=>{
                    return val.category == "Men" && val.type == "shirts"
                }));
    })
  return (
    loading ? 
    <div className='w-full flex justify-center items-center '>
    <Loader/> 
    </div>
    :
    <div className='flex flex-col sm:flex-row flex-wrap justify-center items-center w-full'>
    {shirts.map((val)=>{
    return <Product val={val}/>
    })}
    </div>
  )
}

export default M_shirts