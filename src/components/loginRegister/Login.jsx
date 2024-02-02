import React, { useState } from "react";
import axios from 'axios';
import config from '../../config.js';
import { toast } from "react-toastify";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(email.trim().length < 1 || pass.length < 1) {
            toast.warning("Please fill all the details")
            return;
        }
        
        axios.post(config.getBackendUrl("/login-gismos"), {email: email, password: pass})
        .then((res) => {
            toast.success(res.data.message)
            if (res.data.valid) {
                localStorage.setItem(config.localTokenKey, res.data.token);
                document.location.href = config.prefix;
            }
        })
        .catch((err) => {
            toast.error(err.response ? err.response.data.message : "Some error occurred");
        })
    }

    return (
        <div className="auth-form-container">
            <button className="secondary back-to-home-button" onClick={()=>{document.location.href = config.prefix}}>Back To Home</button>
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="your.email@here.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter Password" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="secondary link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}