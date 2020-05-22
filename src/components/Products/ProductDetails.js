import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../Auth/AuthContext';

import './Style/ProductDetails.css';
import { apiUrl } from '../config';

export default function ProductDetails() {
    const { productId } = useParams();
    const { username } = useContext(AuthContext);
    const [item, setItem] = useState(null);

    async function getItemById(id) {
        const res = await Axios(apiUrl + id);
        setItem(res.data);
    }

    async function onSubmit(e) {
        e.preventDefault();
        try {
            await Axios(apiUrl + productId, {
                method: 'DELETE',
                data: ({
                    item
                })
            });
        } catch (e) {
            console.warn(e);
        }
    }
    useEffect(() => {
        getItemById(productId)
    }, [productId]);


    if (item) {
        return (
            <div className="product-details-page">
                <div className="first-section">
                    <h1>{item.title}</h1>
                    <div className="title-image">
                        <img src={item.imageUrl} alt="Loading..." />
                    </div>
                    <div className="product-description">
                        <h3>Description:</h3>
                        {item.description}
                    </div>
                </div>
                <div className="details-buttons-container">
                    <div className="details">
                        <p>Details</p>
                        <p><span>Body:</span>{item.Body}</p>
                        <p><span>Display:</span>{item.Display}</p>
                        <p><span>Chipset:</span>{item.Chipset}</p>
                        <p><span>Memory:</span>{item.Memory}</p>
                        <p><span>OS:</span>{item.OS}</p>
                        <p><span>Battery:</span>{item.Battery}</p>
                    </div>
                    <div className="product-buttons">
                        {(username ?
                            <>
                                <Link to={'/product/edit/' + item.id}>
                                    <button type='submit'>Edit</button>
                                </Link>
                                <button onClick={onSubmit} type='submit'>Delete Product</button>
                            </>
                            : null
                        )}
                    </div>
                </div>
            </div >
        )
    } else {
        return null;
    }
}
