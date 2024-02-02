import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useProduct } from '../context/useProducts';
import { toast } from 'react-toastify';

const Category = () => {
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [type, setType] =useState([]);
  const {setProducts} = useProduct();
  const [search, setSearch] = useState({
    type: "",
    colors: "",
    sizes: ""
  })

  const fetchData = async()=>{
    await axios.get("https://chicdrobe.onrender.com/products/getsizes").then((res)=>{
      setSizes(res.data.sizes);
    })
    await axios.get("https://chicdrobe.onrender.com/products/getcolors").then((res)=>{
      setColors(res.data.colors);
    })
    await axios.get("https://chicdrobe.onrender.com/products/gettype").then((res)=>{
      setType(res.data.type);
    })
  }
  const categorySearch = (e)=>{
      let name = e.target.name;
      let value = e.target.value;
      setSearch({...search, [name]:value});

    }
    useEffect(()=>{
      axios.post("https://chicdrobe.onrender.com/products/filterproduct",search).then((res)=>{
        if(res.data.product.length != 0){
        setProducts(res.data.product);
        console.log(res.data.product);}
        else{
          toast.error('No product found')
        }
        })
    },[search])

    const sort = async(e)=>{
      let value = e.target.value;
      const {type, colors, sizes} = search;
      await axios.post("https://chicdrobe.onrender.com/products/sort",{value, type, colors, sizes}).then((res)=>{
        if(res.data.data.length != 0){
        setProducts(res.data.data);
        console.log("calling");
      }
        else{
          toast.error('No product found')
        }})
    }

  useEffect(()=>{
      fetchData();
  })

  return (
    <div className='flex flex-col sticky top-0 z-10 bg-white w-full sm:flex-row px-10 mt-5 justify-between'>
        <div className=' '>
            <select name="type" onChange={categorySearch} className='bg-gray-200 m-2 px-2' id="">
              <option value="" selected disabled>Type</option>
              {type.map((val)=>{
                return <option value={val}>{val}</option>
              })}
            </select>
            <select name="colors" onChange={categorySearch} className='bg-gray-200 m-2 px-2' id="">
              <option value="" selected disabled>Color</option>
              {colors.map((val)=>{
                return <option value={val}>{val}</option>
              })}
            </select>
            <select name="sizes" onChange={categorySearch} className='bg-gray-200 m-2 px-2' id="">
              <option value="" selected disabled>Size</option>
              {sizes.map((val)=>{
                return <option value={val}>{val}</option>
              })}
            </select>
        </div>
        <div>
        <select name="Sort" onChange={sort} className='bg-gray-200 m-2 px-2' id="">
              <option value="" selected disabled>Sort</option>
              <option value="low2high" name="low2high">Price: Low to High</option>
              <option value="high2low" name="high2low">Price: High to Low</option>
            </select>
        </div>
    </div>
  )
}

export default Category