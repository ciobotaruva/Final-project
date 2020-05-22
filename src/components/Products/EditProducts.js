import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './Style/EditProduct.css';
import { apiUrl } from '../config'

export default function EditProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    async function getProductById(id) {
        try {
            const res = await axios(apiUrl + id);
            setProduct(res.data);
        } catch (e) {
            console.warn(e);
        }

    }

    async function onSubmit(e) {
        e.preventDefault();

        try {
            await axios(apiUrl + productId, {
                method: 'PUT',
                data: ({
                    ...product
                })
            });
        } catch (e) {
            console.warn(e);
        }
    }

    useEffect(() => {
        getProductById(productId)
    }, [productId]);

    function handleInputChange(e) {
        setProduct({
            ...product,
            [e.currentTarget.id]: e.currentTarget.value
        });
    }

    if (!product) {
        return <h1>Loading...</h1>
    }
    return (
        <div className="edit-product-css">
            <h1>Edit product:{product.title}</h1>
            <form onSubmit={onSubmit}>
                <div className="product-info">
                    <div>
                        <label>Description</label>
                        <textarea
                            onChange={handleInputChange}
                            value={product.description}
                            type="text"
                            id='description'
                        />
                    </div>
                    <div>
                        <label>Display</label>
                        <textarea
                            onChange={handleInputChange}
                            value={product.Display}
                            type="text"
                            id='Display'
                        />
                    </div>
                    <div>
                        <label>Image</label>
                        <textarea
                            onChange={handleInputChange}
                            value={product.imageUrl}
                            type="text"
                            id='imageUrl'
                        />
                    </div>
                    <div>
                        <label>Body</label>
                        <textarea
                            onChange={handleInputChange}
                            value={product.Body}
                            type="text"
                            id='Body'
                        />
                    </div>
                    <div>
                        <label>Chipset</label>
                        <textarea
                            onChange={handleInputChange}
                            value={product.Chipset}
                            type="text"
                            id='Chipset'
                        />
                    </div>
                    <div>
                        <label>Memory</label>
                        <textarea
                            onChange={handleInputChange}
                            value={product.Memory}
                            type="text"
                            id='Memory'
                        />
                    </div>
                    <div>
                        <label>OS</label>
                        <textarea
                            onChange={handleInputChange}
                            value={product.OS}
                            type="text"
                            id='OS'
                        />
                    </div>
                    <div>
                        <label>Battery</label>
                        <textarea
                            onChange={handleInputChange}
                            value={product.Battery}
                            type="text"
                            id='Battery'
                        />
                    </div>
                </div>
                <div className="edit-btn">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

