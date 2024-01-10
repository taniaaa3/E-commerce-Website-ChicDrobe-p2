import { createContext, useContext, useState } from "react";
import axios from 'axios'

const ProductContext = createContext();

export const ProductProvider = ({children})=>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const getAllProducts = async()=>{
        await axios.get('http://localhost:3003/products/all').then((res)=>{
            setProducts(res.data);
            setLoading(false);
        })
    }

        return <ProductContext.Provider value={{products, getAllProducts, loading}}>
            {children}
        </ProductContext.Provider>
}

export const useProduct = ()=>{
    return useContext(ProductContext);
}