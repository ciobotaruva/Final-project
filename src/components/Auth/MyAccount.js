import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './MyAccount.css'

import AuthContext from '../Auth/AuthContext';
export default function MyAccount() {
    const { username } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    async function getUserData() {
        const res = await axios('http://localhost:3014/users?username=' + username);
        setUser(res.data[0]);
    }
    console.log(user);
    useEffect(() => {
        getUserData();
    }, [username]);

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className='account-info'>
            <h4>User Information</h4>
            <div>
                <p>Name: {user.name}</p>
                <p>Address: {user.address}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
            </div>
            <div>
                <Link to="/add-product"><button>Add Product</button></Link>
            </div>
        </div>
    );
}