import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import AuthContext from './AuthContext';
import './Auth.css'

const errors = {
    'username': 'You must enter a username1',
    'password': 'You must enter a password!'
}

export default function Login() {

    const { setUsername } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        'username': '',
        'password': '',
    });

    const [error, setError] = useState({
        'username': '',
        'password': ''
    });

    const [succesfullLogin, setSuccesfullLogin] = useState(false);
    const [incorectPassword, setIncorectPassword] = useState(false);

    function handleInput(e) {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });

        const newError = {
            ...error,
            [e.currentTarget.id]: '',

        }
        setError(newError);
    }

    function validateFormData() {
        const inputs = ['username', 'password'];
        const newError = { ...error };
        let isInvalid = false;

        for (const input of inputs) {
            if (!formData[input]) {
                newError[input] = errors[input];
                isInvalid = true;
            }
        }

        setError(newError);
        return isInvalid;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const isInvalid = validateFormData();
        if (!isInvalid) {
            try {
                const res = await axios(`http://localhost:3014/users?username=${formData.username}`);
                if (res.data.length && res.data[0].password === formData.password) {
                    setUsername(res.data[0].username);
                    localStorage.setItem('username', res.data[0].username);
                    setSuccesfullLogin(true);
                } else {
                    setIncorectPassword(true);
                }
                console.log(res);
            } catch (e) {
                console.warn(e);
            }
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {(succesfullLogin ?
                    <>
                        <Redirect to="/" />
                    </>
                    : incorectPassword ?
                        <>
                            Incorect Username or Password!
                    </>
                        : null
                )}

                <p>Sign In </p>
                <div className="form-input">
                    <input
                        onChange={handleInput}
                        value={formData.username}
                        type="text"
                        id="username"
                        placeholder="Username" />
                    <div className="form-error">
                        {error.username}
                    </div>
                </div>
                <div className="form-input">
                    <input
                        onChange={handleInput}
                        value={formData.password}
                        type="password"
                        id="password"
                        placeholder="Password" />
                    <div className="form-error">
                        {error.password}
                    </div>
                </div>
                <button>Sign In</button>
            </form>
        </div>
    )
}



