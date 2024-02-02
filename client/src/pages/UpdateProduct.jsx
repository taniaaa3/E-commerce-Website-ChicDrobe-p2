import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../context/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    image1: '',
    image2: '',
    category: '',
    type: '',
    stock: ''
  })
  const [images, setImages] = useState([]);
  const {userData} = useAuth();
  const navigate = useNavigate();
  const params = useParams();
    const productFetch = async () => {
        await axios.get(`https://chicdrobe.onrender.com/products/redirect/${params.id}`).then((res) => {
            setProduct(res.data.product);
        }).catch((err) => { console.log(err); })
    }
    useEffect(()=>{
        productFetch();
    },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const {title, price, description, stock} = product;
    if(title && price && description && stock){
      
      try {
          try {
            await axios.patch(`https://chicdrobe.onrender.com/products/update/${params.id}`,{title, price, description, stock}).then((res)=>{
                toast(res.data.msg);
            }).catch((err)=>{console.log(err);})
          } catch (error) {
            console.log(error);
          }
      } catch (error) {
        console.log(error);
      }
    }
    else{
      alert('one or more fields empty');
      console.log(product);
    }
  }

  useEffect(()=>{
    if(!userData.isAdmin){
      navigate('/');
    }
  })

  return (
    <div className="home h-[700px]">
      <div className="login w-full h-full flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} name='productForm' className="form w-5/6 sm:w-2/3 md:w-1/2 px-5 py-5 rounded-lg flex flex-col justify-center items-left">
          <h1 className="self-center m-2 text-2xl font-bold">Update Product</h1>
          <label htmlhtmlFor="title" className="pl-2 font-medium">Title</label>
          <input name="title" value={product.title} className="m-2 px-3 py-1" placeholder="Enter product's title" type="text" required onChange={(e) => { setProduct({ ...product, 'title': e.target.value }) }} />
          <label htmlhtmlFor="price" className="pl-2 font-medium">Price</label>
          <input name="price" value={product.price} className="m-2 px-3 py-1" placeholder="Enter product's price" type="number" required onChange={(e) => { setProduct({ ...product, 'price': e.target.value }) }} />
          <label htmlhtmlFor="description" className="pl-2 font-medium">Description</label>
          <textarea name="description" value={product.description} className="m-2 px-3 py-1" cols={10} rows={5} style={{ resize: "none" }} placeholder="Enter product's description" required onChange={(e) => { setProduct({ ...product, 'description': e.target.value }) }} />



          <label htmlhtmlFor="stock" className="pl-2 font-medium">Stock</label>
          <input name="stock" className="m-2 px-3 py-1" value={product.stock} placeholder="Enter product's stock" type="number" required onChange={(e) => { setProduct({ ...product, 'stock': e.target.value }) }} />




          <button className=" self-center m-3 px-3 py-1 text-xl font-semibold rounded-lg" type='submit'>Update Product</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateProduct