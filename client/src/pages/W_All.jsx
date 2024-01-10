import React, { useEffect, useState } from 'react'
import { useProduct } from '../context/useProducts';
import Product from '../components/Product';
import Loader from '../components/Loader';

const W_All = () => {
    const [women, setWomen] = useState([]);
    const {getAllProducts, products, loading} = useProduct();

    useEffect(()=>{
        getAllProducts();
        setWomen(products.filter((val)=>{
            return val.category == "Women"
        }))
    })
  return (
    loading ? 
    <div className='w-full flex justify-center items-center '>
    <Loader/> 
    </div>
    :
    <div className='flex flex-col sm:flex-row flex-wrap justify-center items-center w-full'>
    {women.map((val)=>{
    return <Product val={val}/>
    })}
    </div>
  )
}

export default W_All