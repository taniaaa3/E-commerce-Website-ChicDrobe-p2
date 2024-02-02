import React from 'react'
import Product from '../components/Product'
import { useProduct } from '../context/useProducts'

const Search = () => {
    let {searchProducts, loading} = useProduct();
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center w-full">
      {searchProducts.length != 0 ? searchProducts.map((val)=>{
            return <Product val={val}/>
        })
    : <div className=' flex justify-center items-center m-10'>
    <h1 className='text-3xl font-bold'>No Product with this name.</h1>
    </div>}
    </div>
  )
}

export default Search