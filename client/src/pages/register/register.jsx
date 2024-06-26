import React from "react";
import './register.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";

const URI = 'http://localhost:8081/users/';

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const navigateLogin = () => {
        navigate(`/login`);
    }

    const navigateRegister = () => {
        navigate(`/register`);
    }

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async() => {
        const res = await axios.get(URI)
        setUsers(res.data)
    }

    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, {user_name: name, password: password, address: address, telephone: telephone, email: email });
        navigateLogin();
    }

    return (
        <div className="register-form">
            <h2>register</h2>
            <form onSubmit={store} action="/auth" method="post">
                <input 
                value={name}
                onChange={ (e) => users.find(event => event.username === e.target.value) ? navigateRegister() : setName(e.target.value)}
                type="text" name="user" id="user" placeholder="user"/>
                <input 
                value={password}
                onChange={ (e) => setPassword((e.target.value))}
                type="password" name="pass" id="pass" placeholder="password"/>
                <input 
                value={address}
                onChange={ (e) => setAddress(e.target.value)}
                type="text" name="pass" id="pass" placeholder="address"/>
                <input 
                value={telephone}
                onChange={ (e) => setTelephone(e.target.value)}
                type="text" name="pass" id="pass" placeholder="telephone"/>
                <input 
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
                type="text" name="pass" id="pass" placeholder="email"/>
                <input type="submit" className="btn-login" value="register" />
            </form>
        </div>
    )
}

export default Register;
