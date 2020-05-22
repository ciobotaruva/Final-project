import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AuthContext from './Auth/AuthContext';
import Header from './Header/Header';
import Home from './HomePage/Home';
import ProductsLists from './Products/ProductsLists';
import ProductDetails from './Products/ProductDetails';
import EditProducts from './Products/EditProducts';
import MyAccount from './Auth/MyAccount';
import AddProduct from './Products/AddProduct';
import LogIn from './Auth/LogIn';
import Register from './Auth/Register';
import '../components/App.css';


function App() {
    const [username, setUsername] = useState();

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setUsername(username);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ username, setUsername }}>
            <BrowserRouter>
                <Header />
                <div className='container'>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/products' component={ProductsLists} />
                    <Route exact path='/products/:type/:company' component={ProductsLists} />
                    <Route exact path='/add-product' component={AddProduct} />
                    <Route exact path="/product/:productId" component={ProductDetails} />
                    <Route exact path='/product/edit/:productId' component={EditProducts} />
                    <Route exat path='/myaccount' component={MyAccount} />
                    <Route path="/LogIn" component={LogIn} />
                    <Route path="/Register" component={Register} />
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;

