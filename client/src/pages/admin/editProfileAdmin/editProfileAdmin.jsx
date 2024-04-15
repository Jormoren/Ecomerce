import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

const URIADMIN = 'http://localhost:8081/users/3/';

const EditAdmin = () => {
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const navigateShop = () => {
        navigate(`/editInventory`);
    }

    const update = async (e) => { 
        e.preventDefault();
        await axios.put(URIADMIN, { password: password, address: address, telephone: telephone, email: email });
        navigateShop();
    }


    return (
        <div className="register-form"> 
            <h2>Edit Profile</h2>
            <form onSubmit={update} action="/auth" method="post">
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
                <input type="submit" className="btn-login" value="Edit" />
            </form>
        </div>
    )
}

export default EditAdmin;