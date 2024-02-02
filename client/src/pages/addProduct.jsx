import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const {title, price, description, category, type, stock} = product;
    if(title && price && description && category && type && stock){
      
      try {
        if (product.description.length >= 150) {
          const formdata = new FormData();
          // const images = [product.image1, product.image2];
          try {
            for (const image of images) {
              formdata.append('file', image)
            }
            await axios.post('http://192.168.1.109:3003/upload/images', formdata)
            .then((res) => { 
              console.log(res.data.images); 
              product.image1 = `${res.data.images[0].filename}`
              product.image2 = `${res.data.images[1].filename}`
            }).then(()=>{
              axios.post('http://192.168.1.109:3003/upload/product',product).then((res)=>{
                    console.log(res);
                    alert('Product added');
  
              }).catch(error => console.log(error))
            })
  
          } catch (error) {
            console.log(error);
          }
        }
        else {
          alert('Description must be of at least 150 characters')
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
    <div className="home h-[1000px]">
      <div className="login w-full h-full flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} name='productForm' className="form w-5/6 sm:w-2/3 md:w-1/2 px-5 py-5 rounded-lg flex flex-col justify-center items-left">
          <h1 className="self-center m-2 text-2xl font-bold">Add Product</h1>
          <label htmlhtmlFor="title" className="pl-2 font-medium">Title</label>
          <input name="title" className="m-2 px-3 py-1" placeholder="Enter product's title" type="text" required onChange={(e) => { setProduct({ ...product, 'title': e.target.value }) }} />
          <label htmlhtmlFor="price" className="pl-2 font-medium">Price</label>
          <input name="price" className="m-2 px-3 py-1" placeholder="Enter product's price" type="number" required onChange={(e) => { setProduct({ ...product, 'price': e.target.value }) }} />
          <label htmlhtmlFor="description" className="pl-2 font-medium">Description</label>
          <textarea name="description" className="m-2 px-3 py-1" cols={10} rows={5} style={{ resize: "none" }} placeholder="Enter product's description" required onChange={(e) => { setProduct({ ...product, 'description': e.target.value }) }} />
          <label htmlhtmlFor="image1" className="pl-2 font-medium">Product Image 1</label>
          <input name="image1" className="m-2 px-3 py-1" placeholder="Enter product's image" type="file" required onChange={(e) => { setImages([...images, e.target.files[0]]) }} />
          <label htmlhtmlFor="image2" className="pl-2 font-medium">Product Image 2</label>
          <input id="image2" name="password" className="m-2 px-3 py-1" placeholder="Enter product's image" type="file" required onChange={(e) => { setImages([...images, e.target.files[0]]) }} />




          <label htmlhtmlFor="category" className="pl-2 font-medium">Category</label>
          <select name="category" className="m-2 px-3 py-1" id="" required onChange={(e) => { 
            setProduct({ ...product, 'category': e.target.value });
            }}>
            <option selected disabled>Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>

          <label htmlhtmlFor="type" className="pl-2 font-medium">Type</label>
          {product.category == 'Men' ? <select name="category" className="m-2 px-3 py-1" required id="" onChange={(e) => { setProduct({ ...product, 'type': e.target.value }) }}>
          <option selected disabled>Select Type</option>
            <option value="shirts">Shirts</option>
            <option value="pants">Pants</option>
            <option value="hoodies">Hoodies</option>
          </select>
            : product.category == 'Women' ?
              <select name="category" className="m-2 px-3 py-1" required id="" onChange={(e) => { setProduct({ ...product, 'type': e.target.value }) }}>
                <option selected disabled>Select Type</option>
                <option value="dresses" >Dresses</option>
                <option value="pants">Pants</option>
                <option value="skirts">Skirts</option>
              </select> 
              : product.category == 'Kids' ?  
              <select name="category" className="m-2 px-3 py-1" required id="" onChange={(e) => { setProduct({ ...product, 'type': e.target.value }) }}>
                <option selected disabled>Select Type</option>
                <option value="boys">Boys</option>
                <option value="girls">Girls</option>
              </select>
              : <select name="category" className="m-2 px-3 py-1" required id="" onChange={(e) => { setProduct({ ...product, 'type': e.target.value }) }}>
              <option value="" disabled selected> Choose category first </option>
            </select>}
          <label htmlhtmlFor="stock" className="pl-2 font-medium">Stock</label>
          <input name="stock" className="m-2 px-3 py-1" placeholder="Enter product's price" type="number" required onChange={(e) => { setProduct({ ...product, 'stock': e.target.value }) }} />




          <button className=" self-center m-3 px-3 py-1 text-xl font-semibold rounded-lg" type='submit'>Add Product</button>
        </form>
      </div>
      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ratione adipisci earum voluptate fuga enim recusandae eaque quae commodi accusamus ex ullam distinctio iure numquam! Officia voluptatum eligendi laboriosam dolorum.
      Perspiciatis iure, maxime provident exercitationem magni labore minima beatae? Possimus odio, dolore nobis quasi minima reiciendis omnis eos nostrum vel culpa repellat dolores at porro quisquam magnam ab nisi quibusdam?
      Numquam sapiente quibusdam distinctio suscipit architecto tempora similique eaque, vel obcaecati neque impedit, aperiam, cumque odio ab quae nostrum eius optio ea ut ipsum natus velit repellendus mollitia! Facere, aut.
      Eaque minima sapiente corrupti voluptas quasi, debitis ex ducimus omnis exercitationem inventore est atque, pariatur totam, iure quas minus harum reprehenderit excepturi vero! Assumenda quae ad, iusto nostrum laborum sed.
      Alias laboriosam obcaecati amet nulla cum iste dolores praesentium, quaerat reprehenderit dolore, similique excepturi vero explicabo in quisquam error pariatur eum, aliquam officiis? Nemo dolor, consequatur accusantium labore dicta officia.
      Est quo sapiente aspernatur ratione a soluta labore aut architecto enim distinctio autem libero dolor eligendi veniam amet iusto, expedita aliquid, beatae placeat saepe rerum. Soluta a itaque eius qui.
      Assumenda perspiciatis ipsa, provident quos obcaecati sapiente id, illo asperiores ad ut omnis at quod molestiae nemo iure expedita, dolores rerum? Sequi numquam illum nobis, quae minima autem? Laboriosam, eos.
      Facere voluptatem possimus cupiditate soluta velit. Hic voluptatum impedit autem, architecto nobis velit, est voluptates laboriosam iste accusamus eveniet, nisi laborum dolores eius quisquam aperiam officiis enim reprehenderit doloribus distinctio.
      Numquam, totam aliquid. Sequi dolorum quis unde quia. Reiciendis, dicta doloribus sunt aperiam maxime tenetur minima qui perspiciatis at pariatur ipsam, repellendus aliquid quaerat eius. Officiis nam magnam neque similique.
      Rerum, dolorum qui! Quas, libero reprehenderit voluptatibus magnam temporibus et culpa similique minima odit quae eaque error. Impedit rerum, id consequatur quaerat non, fugit debitis consequuntur odit quidem sint voluptatum? */}
    </div>
  )
}

export default AddProduct