import {Route, Routes, useNavigate} from 'react-router-dom';

import FormApp from './components/loginRegister/FormApp.jsx';
import Home from './components/home/Home.jsx';
import { useEffect, useState } from 'react';
import config from './config.js';
import axios from 'axios';
import './app.css'
import ProductPage from './components/product/ProductPage.jsx';
import Orders from './components/orders/Orders.jsx';
import Profile from './components/profile/Profile.jsx';
import Confirm from './components/confirm/Confirm.jsx';

function setSessionUser(user_id, name, email) {
    sessionStorage.setItem(config.sessionIdKey, user_id);
    sessionStorage.setItem(config.sessionNameKey, name);
    sessionStorage.setItem(config.sessionEmailKey, email);
}
function getSessionUser() {
    const _id = sessionStorage.getItem(config.sessionIdKey);
    const name = sessionStorage.getItem(config.sessionNameKey);
    const email = sessionStorage.getItem(config.sessionEmailKey);

    return {_id: _id, name: name, email: email}
}
function isSessionActive() {
    const storedId = sessionStorage.getItem(config.sessionIdKey);

    if (storedId != null) {
        return true
    }
    return false
}
function removeSessionUser() {
    sessionStorage.clear()
}
function getToken() {
    return localStorage.getItem(config.localTokenKey)
}
function removeToken() {
    localStorage.clear();
}

function TopBar({userDetails, userCart}) {
    const navigate = useNavigate();
    return <div className="top-bar">
        <div className='logo-div' onClick={() => {document.location.href = config.prefix}}>
            <img className='logo-img' src='./logo.png' alt='[LOGO]' />
            <span className='logo-text'>GiSmos</span>
        </div>
        <ul className='nav-bar'>
            <li className='nav-link'><a onClick={() => {
                document.getElementById("cart-view").classList.remove("visible")                
                navigate(userDetails._id ? config.ordersPage : config.loginPage)}}><span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000" viewBox="0 0 256 256"><path d="M224,177.32122V78.67878a8,8,0,0,0-4.07791-6.9726l-88-49.5a8,8,0,0,0-7.84418,0l-88,49.5A8,8,0,0,0,32,78.67878v98.64244a8,8,0,0,0,4.07791,6.9726l88,49.5a8,8,0,0,0,7.84418,0l88-49.5A8,8,0,0,0,224,177.32122Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><polyline points="177.022 152.511 177.022 100.511 80 47" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline><polyline points="222.897 74.627 128.949 128 33.108 74.617" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline><line x1="128.94915" y1="128" x2="128.01036" y2="234.82131" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                My Orders</span></a></li>
            <li className='nav-link'><a onClick={() => {
                document.getElementById("cart-view").classList.remove("visible")
                navigate(userDetails._id ? config.confirmPage : config.loginPage)}}><span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000" viewBox="0 0 256 256"><rect x="24" y="56" width="208" height="144" rx="8" strokeWidth="16" stroke="#000" strokeLinecap="round" strokeLinejoin="round" fill="none"></rect><line x1="167.99414" y1="168" x2="199.99414" y2="168" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="119.99414" y1="168" x2="135.99414" y2="168" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="23.99414" y1="96.85228" x2="231.99412" y2="96.85228" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                Checkout</span></a></li>
            <li className='nav-link'><a onClick={() => {
                document.getElementById("cart-view").classList.remove("visible")
                navigate(userDetails._id ? config.profilePage : config.loginPage)
            }}><span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000" viewBox="0 0 256 256"><circle cx="128" cy="128" r="96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><circle cx="128" cy="120" r="40" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><path d="M63.79905,199.37405a72.02812,72.02812,0,0,1,128.40177-.00026" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
                {userDetails._id ? "Account" : "Login"}</span></a></li>
        </ul> 
        <span className='right-nav'>
            <li className='nav-link'><a onClick={() => {
                    const cartDiv = document.getElementById("cart-view");
                    cartDiv.classList.toggle("visible")
                }}><span><svg width="32" height="32" version="1.1" viewBox="0 0 47.967 48.049" xmlns="http://www.w3.org/2000/svg"><path d="m23.054 37.992c0 1.77-1.543 3.2048-3.4464 3.2048s-3.4464-1.4348-3.4464-3.2048c-1e-6 -1.77 1.543-3.2048 3.4464-3.2048s3.4464 1.4348 3.4464 3.2048zm-6.1096-9.3234s-4.4386 0-4.3118 2.7192c0.1268 2.7192 4.5654 2.7192 4.5654 2.7192l24.73-0.1648m-40.328-26.958s5.1162-0.65174 6.9069 0.93104c1.7907 1.5828 7.9301 19.925 7.9301 19.925s-0.63952 0.83792 4.7325 0.93104c5.372 0.0931 18.674 0.37242 20.337-0.37242 1.6628-0.74485 4.8604-13.128 4.8604-13.128s-0.63954-2.9794-4.9883-3.2587c-4.3488-0.27932-25.197 0.0931-25.197 0.0931s-3.8372 0.74485-4.2209 1.6759m28.513 24.21c0 1.77-1.5063 3.2048-3.3643 3.2048s-3.3643-1.4348-3.3643-3.2048c0-1.77 1.5063-3.2048 3.3643-3.2048s3.3643 1.4348 3.3643 3.2048z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.2"/></svg>
                    <span id='cart-text'>Cart</span>{`(${userCart.length})`}</span></a>
            </li>
            <div className='nav-bar-button nav-link'><a onClick={() => {
                document.getElementsByClassName("nav-bar")[0].classList.toggle("visible")
            }}><span><img src='./navbutton.png' alt='▼' height={24} width={24} /></span></a></div>
        </span>
        
    </div>
}

function App() {
    const navigate = useNavigate();
    let [userDetails, setUserDetails] = useState({_id: null});
    let [currentProductView, setCurrentProductView] = useState({})
    let [productsList, setProductsList] = useState([]);
    let [userCart, setUserCart] = useState([]);

    function changeUserCart(cart) {
        setUserCart(cart);
    }
    function addToCart(item) {
        setUserCart([...userCart, item]);
    }
    function removeFromCart(product_id) {
        let list = userCart.filter((_id) => {
            return product_id != _id
        });

        const token = localStorage.getItem(config.localTokenKey)
        const cart = list;

        axios.put(config.getBackendUrl("/update-cart"), {cart: cart}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            if (res.data.valid) {
                alert("Removed From Cart");
                setUserCart(list);
            }
        })
        .catch((err) => {
            alert(err.response ? err.response.data.message : "Some error occurred");
        })
    }
    function changeProductsList(list) {
        setProductsList(list)
    }
    useEffect(() => {
        if (productsList.length > 0) {
            return;
        }
        axios.get(config.getBackendUrl("/get-products")).then((res) => {
            if (res.data.valid) {
                changeProductsList(res.data.products);    
            }
        }).catch((err) => {
            changeProductsList(["ERROR"])
        })
    }, [])

    function changeUserDetails (user) {
        setUserDetails(user)
    }
    function changeProductView(product) {
        setCurrentProductView(product)
    }

    useEffect(() => {
        // let currentSessionActive = isSessionActive();
        // if (currentSessionActive) {
        //     changeUserDetails(getSessionUser());
        //     return;
        // }

        const token = getToken();

        if (token) {
            axios.post(config.getBackendUrl("/autologin-gismos"), {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.data.valid) {
                    const user = res.data.user;
                    setSessionUser(user._id, user.name, user.email);
                    changeUserDetails(user);
                    changeUserCart(user.cart);
                }
            }).catch(err => {
                removeSessionUser();
                removeToken();
                alert(err.response ? err.response.data.message : "Some error occurred");
            })
        }
        else {
            removeSessionUser();
            removeToken();
        }
    }, [])

    let currentSessionActive = isSessionActive();

    return <div className='app'>
        <div id='cart-view'>
            <h2>Your Cart {`(${userCart.length})`}</h2>
            <button className='close-menu critical' onClick={() => {
                document.getElementById("cart-view").classList.toggle("visible")
            }}>X</button>
            {currentSessionActive ? <button className='confirm-cart-button' onClick={() => {
                document.getElementById("cart-view").classList.toggle("visible")
                navigate(config.confirmPage);
            }}>Confirm Order</button> : <></>}
            {
                userCart.length > 0 ? 
                productsList.map((product, index) => {
                    if (userCart.includes(product._id)) {
                        return <div className='cart-item'>
                            <img className='cart-img' src={product.photo} height={42}/>
                            <span className='cart-details'>
                                <h4 className='cart-title'>{product.title}</h4>
                                <span>Rs.{product.price}</span>
                                <button className='remove-cart-item' onClick={() => {
                                    removeFromCart(product._id);
                                }}>Remove</button>
                            </span>
                        </div>
                    }
                })
                : <div className='cart-item'>Cart Empty</div>
            }
        </div>

        <Routes>
            <Route path='/' Component={() => {return <><TopBar userDetails={userDetails} userCart={userCart} /><Home userDetails={userDetails} changeProductView={changeProductView} addToCart={addToCart} productsList={productsList} userCart={userCart}/></>}} />
            <Route path='/login' Component={
                currentSessionActive ? 
                () => {document.location.href = config.prefix; return null} :
                FormApp
            } />
            <Route path='/profile' Component={() => {return <><TopBar userDetails={userDetails} userCart={userCart} /><Profile userDetails={userDetails} /></>}} />
            <Route path='/product' Component={() => {return <><TopBar userDetails={userDetails} userCart={userCart} /><ProductPage userDetails={userDetails} currentProduct={currentProductView} addToCart={addToCart} userCart={userCart} /></>}} />
            <Route path='/confirm' Component={
                currentSessionActive ?
                () => {return <><TopBar userDetails={userDetails} userCart={userCart} /><Confirm userDetails={userDetails} productsList={productsList} userCart={userCart} removeFromCart={removeFromCart} /></>} :
                () => {document.location.href = config.prefix; return null}
            } />
            <Route path='/orders' Component={
                !currentSessionActive ? 
                () => {document.location.href = config.prefix; return null} :
                () => {return <><TopBar userDetails={userDetails} userCart={userCart} /><Orders currentUser={userDetails} productsList={productsList} /></>}
            } />
            <Route path='/*' Component={() => {return <>
            <TopBar userDetails={userDetails} userCart={userCart} />
                <h2 style={{textAlign: "center"}}>ERROR 404: Page Not found. Go to <a onClick={()=>{document.location.href = config.prefix}}>Homepage</a></h2>
            </>}} />
        </Routes>
    </div>
}

export default App;