import React from 'react'; 
import { Product } from './Product'; 
import axios from 'axios'; 
import { useState } from 'react'; 
import { useEffect } from 'react'; 

const URI = 'http://localhost:8081/products/'; // Requests are made here

export const EditProduct = () => { // EditProduct component definition

    const [products, setProducts] = useState([]); 
    useEffect(() => {
        getProduct()
    }, []);

    const getProduct = async () => { 
        const res = await axios.get(URI)
        setProducts(res.data); 
    }

    return (
        <div className="shop"> 
            <div className="shopTitle"> 
                <h1>Edit Products</h1> 
            </div>
            <div className="products">  
                {products.map((product) => ( 
                    <Product data={product} />
                ))}
            </div>
        </div>
    )
};
