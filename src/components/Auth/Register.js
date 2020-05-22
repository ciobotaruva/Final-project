import React, { useState } from 'react';
import Axios from 'axios';

import { registerUrl } from '../config';
import './Auth.css'

const errorMessages = {
    'username': 'Username required!',
    'name': 'Full name is required!',
    'address': 'Address is required!',
    'email': 'You must enter an email adress!',
    'vaild-email': 'Please enter a valid email address!',
    'password': 'Password required',
    'retype-password': 'You must retype the same password!',
    'different-password': 'You must enter the same password twice!',
    'similar-password': 'Password must be different from username!'
}

function Register() {

    const [formData, setFormData] = useState({
        'username': '',
        'name': '',
        'address': '',
        'email': '',
        'password': '',
        'retype-password': '',
    });


    const [error, setError] = useState({
        'username': '',
        'name': '',
        'address': '',
        'email': '',
        'password': '',
        'retype-password': '',
        'different-password': ''
    });

    const [isDirty, setIsDirty] = useState(false);
    const [succcsfullRegister, setSucccsfullRegister] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();
        const isInvaild = formValidation();
        if (!isInvaild) {
            setIsDirty(false);
            try {
                await Axios(registerUrl, {
                    data: formData,
                    method: 'POST'
                });
                setSucccsfullRegister(true);
            } catch (e) {
                console.warn(e);
            }
        }
    }

    function handleInputChange(e) {
        setIsDirty(true);
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });

        const newError = {
            ...error,
            [e.currentTarget.id]: '',
        }

        if (e.currentTarget.id === 'password' || e.currentTarget.id === 'retype-password') {
            newError['diffrent-password'] = '';
        }

        setError(newError);
    }


    function formValidation() {
        const inputs = ['username', 'name', 'address', 'email', 'password', 'retype-password'];
        const newError = { ...error };
        let isInvalid = false;

        for (const input of inputs) {
            if (!formData[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }
        }

        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i.test(formData.email)) {
            newError.email = errorMessages['vaild-email'];
            isInvalid = true;
        }

        if (formData.password !== formData['retype-password']) {
            newError['different-password'] = errorMessages['different-password'];
            isInvalid = true;
        }

        setError(newError);
        return isInvalid;
    }


    return (
        <div className="form-container">
            <form onSubmit={onSubmit}>
                {(succcsfullRegister ?
                    <div>
                        User created sucessfuly!
                    </div>
                    : null)}

                <p>Register</p>
                <div className="form-input">
                    <input
                        onChange={handleInputChange}
                        value={formData.name}
                        type="text"
                        id="name"
                        placeholder="Full Name" />
                    <div className="form-error">{error.name}</div>
                </div>
                <div className="form-input">
                    <input
                        onChange={handleInputChange}
                        value={formData.address}
                        type="text"
                        id="address"
                        placeholder="Address" />
                    <div className="form-error">{error.address}</div>
                </div>
                <div className="form-input">
                    <input
                        onChange={handleInputChange}
                        value={formData.username}
                        type="text"
                        id="username"
                        placeholder="Username" />
                    <div className="form-error">{error.username}</div>
                </div>
                <div className="form-input">
                    <input
                        onChange={handleInputChange}
                        value={formData.email}
                        type="text"
                        id="email"
                        placeholder="Email" />
                    <div className="form-error">{error.email}</div>
                </div>
                <div className="form-input">
                    <input
                        onChange={handleInputChange}
                        value={formData.password}
                        type="password"
                        id="password"
                        placeholder="Password" />
                    <div className="form-error">{error.password}</div>
                </div>
                <div className="form-input">
                    <input
                        onChange={handleInputChange}
                        value={formData["retype-password"] || error["different-password"]}
                        type="password"
                        id="retype-password"
                        placeholder="Retype Password" />
                    <div className="form-error">
                        {error["retype-password"]}
                        {error["different-password"]}
                    </div>
                </div>
                <button type="submit" disabled={!isDirty} >Register</button>
            </form>
        </div >
    )
}

export default Register;