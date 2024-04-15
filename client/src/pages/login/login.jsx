import React from "react";
import './login.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { useContext } from "react";

const URI = 'http://localhost:8081/users/';

const Login = () => {
    const context = useContext(ShopContext);
    const navigate = useNavigate();
    const navigateRegister = () => {
        navigate(`/register`);
    }

    const navigateLogin = () => {
        navigate(`/login`);
    }

    const navigateShopAddtoCart = () => {
        navigate(`/shop`);
    }

    const navigateEditInventory = () => {
        navigate(`/editInventory`);
    }

    const [entry, SetEntry] = useState('');
    const [entryP, SetEntryP] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async() => {
        const res = await axios.get(URI)
        console.log(res.data);
        setUsers(res.data)
    }

    const compare = () => {
            if (users.find(e => e.user_name === entry && e.password === entryP))
                return true;
            else
                return false;
    }

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={compare()}>
                <input 
                    value={entry}
                    onChange={(e) => SetEntry(e.target.value)}
                    type="text" name="user" id="user" placeholder="user" />
                <input 
                    value={entryP}
                    onChange={(e) => SetEntryP((e.target.value))}  
                    type="password" name="pass" id="pass" placeholder="password" />
                <input type="submit" className="btn-login" value="Login" onClick={(e) => {
                    e.preventDefault();
                    if(compare())
                    {
                        if (entry === 'admin')
                        {
                            navigateEditInventory();
                            context.AdminChanger(true);
                        }
                        else 
                            navigateShopAddtoCart();
                        context.loggedChanger(true);
                    }
                    else
                         navigateLogin() }}/>
            </form>
            <div href="register" className="btn-register" onClick={navigateRegister}>register</div>
        </div>
    )
}

export default Login;
