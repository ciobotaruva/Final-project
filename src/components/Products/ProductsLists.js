import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

import './Style/Products.css';
import ProductCard from './ProductCard';


function ProductsLists() {
    let [items, setItems] = useState([]);
    let { type, company } = useParams();

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const q = useQuery().get('q');

    useEffect(() => {
        getItems();
    }, [type, company, q]);

    async function getItems() {
        let res;
        if (q) {
            res = await axios(`http://localhost:3014/products?title_like=${q}`);
        } else {
            res = await axios(`http://localhost:3014/products?company=${company}-${type}`);
        }
        setItems(res.data);
    }


    return (
        <div className="products">
            {items.map(item => <ProductCard item={item} key={item.id} />)}
        </div>
    )

}


export default ProductsLists;