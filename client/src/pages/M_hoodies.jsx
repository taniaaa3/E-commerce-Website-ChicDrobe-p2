import React, { useEffect, useState } from 'react'
import { useProduct } from '../context/useProducts'
import Product from '../components/Product';
import Loader from '../components/Loader';

const M_hoodies = () => {
    const {products, getAllProducts, loading} = useProduct();
    const [hoodies, sethoodies] = useState([])
    useEffect(()=>{
        getAllProducts();
        sethoodies( products.filter((val)=>{
                    return val.category == "Men" && val.type == "hoodies"
                }));
    })
  return (
    loading ? 
    <div className='w-full flex justify-center items-center '>
    <Loader/> 
    </div>
    :
    <div className='flex flex-col sm:flex-row flex-wrap justify-center items-center w-full'>
    {hoodies.map((val)=>{
    return <Product val={val}/>
    })}
    </div>
  )
}

export default M_hoodies