import React, { useContext } from "react"; 
import { Link } from "react-router-dom"; 
import { ShoppingCart } from "phosphor-react"; 
import "./navbar.css"; 
import { ShopContext } from "../context/shop-context"; 

export const Navbar = () => {
    const context = useContext(ShopContext);

    return (
        <div className="navbar">
        { !context.admin ? //Checking if the registered user is an admin to determine the available options //
            !context.logged ? // Checking if a user is logged in to redirect to login or the cart when clicked //
                <div className="links"> 
                    <Link to="/"> Shop </Link> {/* Redirects to the root route when the shop text is clicked */} 
                    <Link to="/login"> {/* Redirects to login when the cart is clicked */}
                        <ShoppingCart size={32}/>{/* Calling the shopping cart element */}
                    </Link>
                </div>
                :
                <div className="links"> {/* If logged in, redirects to shop; clicking cart redirects to cart */}
                    <Link to="/shop"> Shop </Link>
                    <Link to="/cart">
                        <ShoppingCart size={32}/>{/* Calling the shopping cart element */}
                    </Link>
                </div>
            :
            <div className="links"> {/* If the user is an admin, it sends to the inventory editor and the admin profile editor */}
                    <Link to="/editInventory"> Products </Link>
                    <Link to="/editAdmin"> Admin Profile </Link>
                </div>
        }
        </div>
    )
};
