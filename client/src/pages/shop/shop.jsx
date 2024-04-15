import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from './product';
import './shop.css';

const URI = 'http://localhost:8081/products/';

export const Shop = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await axios.get(URI);
            setProducts(res.data);
        } catch (error) {
            setError(error);
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>Timezone & Co.</h1>
            </div>
            <div className="products"> 
                {products.map((product) => (
                    <Product data={product} /> //se llama al producto con sus propias informaciones 
    ))}
</div>
        </div>
    )
};
