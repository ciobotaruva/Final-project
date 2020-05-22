import React from 'react';
import { Link } from 'react-router-dom';

import './Style/Products.css';


function ProductCard({ item }) {
    return (
        <div className="product">
            <Link to={'/product/' + item.id} style={{ textDecoration: 'none' }} >
                <div className="product-details">
                    <img src={item.imageUrl} alt="Product" />
                    <h4>{item.title}</h4>
                    <p>{item.Price}</p>
                </div>
            </Link>
            <button>Details</button>
        </div >
    )
}

export default ProductCard;