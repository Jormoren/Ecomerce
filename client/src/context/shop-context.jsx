import React, { createContext, useState } from 'react'; 
import axios from 'axios';
import { useEffect } from 'react';

export const ShopContext = createContext(null);

const URI = 'http://localhost:8081/products/'; // This will be the URL to which requests will be made, in this case for products

const getDefaultCart = () => { // Create an array that will be used to assign a quantity to each product, where each position of the array contains a zero as quantity
    let cart = {};
    for(let i = 1; i < 12 ; i++) {
        cart[i] = 0;
    }
    return cart;
};

export const ShopContextProvider = (props) => { 
    const [cartItems, setCartItems] = useState(getDefaultCart()); // Products entered in the cart will be stored here
    const [payAmount,setPayAmount] = useState(0); // Total purchase amount will be stored here

    const [products, setProducts] = useState([]); // All products in the database will be obtained here
    useEffect(() => {
        getProducts(); // Retrieve products
    }, []);

    const [logged, setLogged] = useState(0); // This hook is to know if there is a user logged in the page
    const loggedChanger = (value) => setLogged(value); // Change the value of the 'logged' hook 

    const [admin, setAdmin] = useState(false); // It is used to know if the user is an admin, by default the hook is false
    const AdminChanger = (value) => setAdmin(value);
    
    const getProducts = async () => { // Requests to the database to retrieve all products
        const res = await axios.get(URI)
        setProducts(res.data);

    }


    const getTotalCartAmount = () => { // This function allows you to know the total purchase amount
        let totalAmount = 0; // Create a variable with the total starting at 0
        for (const item in cartItems) { // Create a loop that iterates over each item in the 'cartItems' array
            if (cartItems[item] > 0) { // Check if the value at the 'item' position of that array is greater than 0
                let itemInfo = products.find((product) => product.id === Number(item)); // Store the product in a variable to use the price later
                totalAmount += cartItems[item] * itemInfo.price; // Multiply the product price by the quantity of products in the array and add it to 'totalAmount'
            }
        }
        return totalAmount; // Return the total purchase amount
    };

    const addToCart = async (itemId) => { // Function to add to the cart, passing the product id as a parameter to reserve it on the server
        await axios.get(`http://localhost:8081/products/book/'+ itemId + '?f=book`) // Make a GET request to bring the product that will be reserved
        .then(({ data }) => {
            data==='Booked' ? setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1 })) : void(0); // If the data extracted is 'Booked', add 1 to the position representing the product within the array to know the quantity of each product
            data==='Stockout' ? alert('Empty product') : void(0); // If the returned status is 'Stockout', create an alert saying that the product is empty and do nothing
        })
        .catch(error => {
            console.log(error.message); // If there is an error, show it in the console
        }) 
    };

    const removeFromCart = async (itemId) => { // Function to remove from the cart based on the id
        await axios.get(`http://localhost:8081/products/book/${itemId}?f=unbook`) // Make the request
        .then(({ data }) => {
            data==='Unbooked' ? setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1 })) : void(0); // If it has the 'Unbooked' state, subtract 1 in the quantity array
        })
        .catch(error => {
            console.log(error.message);
        }) 
    };

    const contextValue = { cartItems, addToCart, removeFromCart, getTotalCartAmount, loggedChanger, logged, AdminChanger, admin, payAmount, setPayAmount};
    return (
        <ShopContext.Provider value={contextValue}> {/* Provide the context to child components */}
            {props.children}
        </ShopContext.Provider>
    );
};
