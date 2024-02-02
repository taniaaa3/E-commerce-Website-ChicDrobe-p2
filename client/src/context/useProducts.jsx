import { createContext, useContext, useState } from "react";
import axios from 'axios'

const ProductContext = createContext();

export const ProductProvider = ({children})=>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState();
    const [searchProducts, setSearchProducts] = useState([]);
    const getAllProducts = async()=>{
        await axios.get('https://chicdrobe.onrender.com/products/all').then((res)=>{
            setProducts(res.data);
            setLoading(false);
        })
    }

        return <ProductContext.Provider value={{products, getAllProducts, loading, setProducts, search, setSearch,setSearchProducts, searchProducts, setLoading}}>
            {children}
        </ProductContext.Provider>
}

export const useProduct = ()=>{
    return useContext(ProductContext);
}