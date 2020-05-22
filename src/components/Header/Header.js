import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../Auth/AuthContext';

import './Style/Header.css';
import './Style/UserNav.css';
import { FaBars, FaAngleDown, FaUserAlt } from 'react-icons/fa';

export default function Header() {
    const { username, setUsername } = useContext(AuthContext);
    const [search, setSearch] = useState('');
    const history = useHistory();
    const [timeout, setTout] = useState(null);

    function handleLogout(e) {
        e.preventDefault();
        setUsername(null);
        localStorage.removeItem('username');
    }


    function handleSearch(e) {
        if (timeout) {
            clearTimeout(timeout);
            setTout(null);
        }
        const val = e.currentTarget.value;
        setSearch(val);
        setTout(setTimeout(() => redirect(val), 400));
    }

    function redirect(val) {
        history.push('/products?q=' + val);
    }

    return (
        <div className="header-main">
            <div className="header-user">
                <Link to="/" style={{ textDecoration: 'none' }} >
                    <h3>Best Gadgets</h3>
                </Link>
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search..." />
                <nav>
                    <ul>
                        <li>
                            {(username ?
                                <div className="user-menu">
                                    <div className='user-icon'>
                                        <FaUserAlt className="icon" />
                                    </div>
                                    <div>
                                        {username}
                                    </div>
                                    <div className='user-arrow'>
                                        <FaAngleDown />
                                    </div>
                                </div>
                                :
                                <div className="my-account">
                                    <div className="user-icon">
                                        <FaUserAlt />
                                    </div>
                                    My Account
                                </div>
                            )}
                            <ul>
                                <li>
                                    {(username ?
                                        <Link to="/myaccount" style={{ textDecoration: 'none' }}>
                                            My Account
                                        </Link>
                                        :
                                        <Link to="/LogIn" style={{ textDecoration: 'none' }}>
                                            Sign In
                                        </Link>
                                    )}
                                </li>
                                <li>
                                    {(username ?
                                        <div>
                                            <a href="/" onClick={handleLogout} style={{ textDecoration: 'none' }}>Logout</a>
                                        </div>
                                        :
                                        <Link to="/Register" style={{ textDecoration: 'none' }}>
                                            Register
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="header-nav">
                <nav>
                    <FaBars className="burger" />
                    <ul>
                        <li>Products
                        <FaAngleDown className="main-nav-arrow" />
                            <ul>
                                <li>Phones
                                    <ul>
                                        <Link to="/products/Phones/Samsung">
                                            <li>Samsung</li></Link>
                                        <Link to="/products/Phones/Apple"><li>Apple</li>
                                        </Link>
                                        <Link to="/products/Phones/Huawei">
                                            <li>Huawei</li>
                                        </Link>
                                    </ul>
                                </li>
                                <li>Tablets
                                    <ul>
                                        <Link to='/products/Tablets/Samsung'>
                                            <li>Samsung</li>
                                        </Link>
                                        <Link to='/products/Tablets/Apple'>
                                            <li>Apple</li>
                                        </Link>
                                        <Link to='/products/Tablets/Huawei'>
                                            <li>Huawei</li>
                                        </Link>
                                    </ul>
                                </li>
                                <li>Laptops
                                    <ul>
                                        <Link to='/products/Laptops/Asus'>
                                            <li>Asus</li>
                                        </Link>
                                        <Link to='/products/Laptops/Apple'>
                                            <li>Apple</li>
                                        </Link>
                                        <Link to='/products/Laptops/Razer'>
                                            <li>Raze</li>
                                        </Link>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div >
    );

}

