import {Route, Routes} from 'react-router-dom';

import FormApp from './components/loginRegister/FormApp.jsx';
import Home from './components/home/Home.jsx';
import { useEffect, useState } from 'react';
import config from './config.js';
import axios from 'axios';

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
function setToken(token) {
    localStorage.setItem(config.localTokenKey, token)
}
function removeToken() {
    localStorage.clear();
}

function App() {
    let [userDetails, setUserDetails] = useState({_id: null});
    function changeUserDetails (user) {
        setUserDetails(user)
    }

    useEffect(() => {
        let currentSessionActive = isSessionActive();
        if (currentSessionActive) {
            changeUserDetails(getSessionUser());
            return;
        }

        const token = getToken();

        if (token) {
            axios.post(config.getBackendUrl("/autologin"), {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.data.valid) {
                    const user = res.data.user;
                    setSessionUser(user._id, user.name, user.email);
                    changeUserDetails(user)
                }
            }).catch(err => {
                removeSessionUser();
                removeToken();
            })
        }
        else {
            removeSessionUser();
            removeToken();
        }
    }, [])

    let currentSessionActive = isSessionActive();

    return <div className='app'>
        <Routes>
            <Route path='/' Component={Home} />
            <Route path='/login' Component={
                currentSessionActive ? 
                () => {document.location.href = config.homePage; return null} :
                FormApp
            } />
        </Routes>
    </div>
}

export default App;