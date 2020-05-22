import React, { useState } from 'react';
import axios from 'axios';

import './Style/EditProduct.css';
import { addProductUrl } from '../config';
import '../Products/Style/EditProduct.css'

export default function AddProduct() {

    const [formData, setFormData] = useState({
        'title': '',
        'description': '',
        'Body': '',
        'Display': '',
        'imageUrl': '',
        'Chipset': '',
        'Memory': '',
        'OS': '',
        'Battery': '',
        'Price': '',
        'company': '',
    });

    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });
    }


    async function saveProduct(e) {
        e.preventDefault();
        try {
            await axios(addProductUrl, {
                data: formData,
                method: 'POST'
            });

        } catch (e) {
            console.warn(e);
        }
    }


    return (
        <div className="edit-product-css">
            <h1>Add product</h1>
            <form onSubmit={saveProduct}>
                <div className="product-info">
                    <div>
                        <label>Title</label>
                        <textarea
                            onChange={handleInputChange}
                            type="text"
                            id='title'
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            onChange={handleInputChange}
                            type="text"
                            id='description'
                        />
                    </div>
                    <div>
                        <label>Body</label>
                        <textarea
                            onChange={handleInputChange}
                            type="text"
                            id='Body'
                        />
                    </div>
                    <div>
                        <label>Display</label>
                        <textarea
                            onChange={handleInputChange}
                            type="text"
                            id='Display'
                        />
                    </div>
                    <div>
                        <label>Image Url</label>
                        <textarea
                            onChange={handleInputChange}
                            type="text"
                            id='imageUrl'
                        />
                    </div>
                    <div>
                        <label>Chipset</label>
                        <textarea
                            onChange={handleInputChange}
                            type="text"
                            id='Chipset'
                        />
                    </div>
                    <div>
                        <label>Memory</label>
                        <textarea
                            onChange={handleInputChange}
                            type="text"
                            id='Memory'
                        />
                    </div>
                    <div>
                        <label>OS</label>
                        <textarea
                            onChange={handleInputChange}
                            type="text"
                            id='OS'
                        />
                    </div>
                    <div>
                        <label>Battery</label>
                        <textarea
                            onChange={handleInputChange}
                            type="text"
                            id='Battery'
                        />
                    </div>
                    <div>
                        <label>Price</label>
                        <textarea
                            onChange={handleInputChange}
                            type="text"
                            id='Price'
                        />
                    </div>
                    <div>
                        <label>Company</label>
                        <textarea
                            onChange={handleInputChange}
                            type="text"
                            id='company'
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

