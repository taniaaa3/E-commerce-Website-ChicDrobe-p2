import React, { useEffect, useState } from 'react'
import { useProduct } from '../context/useProducts'
import Product from '../components/Product';
import Loader from '../components/Loader';

const M_All = () => {
    const {products, getAllProducts, loading} = useProduct();
    const [all, setAll] = useState([])
    useEffect(()=>{
        getAllProducts();
        setAll( products.filter((val)=>{
                    return val.category == "Men"
                }));
    })
  return (
    loading ? 
    <div className='w-full flex justify-center items-center '>
    <Loader/> 
    </div>
    :
    <div className='flex flex-col sm:flex-row flex-wrap justify-center items-center w-full'>
    {all.map((val)=>{
    return <Product val={val}/>
    })}
    </div>
  )
}

export default M_All