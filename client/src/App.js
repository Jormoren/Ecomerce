import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar.jsx";
import { Shop } from './pages/shop/shop';
import { Cart } from './pages/cart/cart';
import { ShopContextProvider } from "./context/shop-context";
import { ShopAddtoCart } from "./pages/shopAddtoCart/shopAddtoCart";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import EditAdmin from "./pages/admin/editProfileAdmin/editProfileAdmin";
import { EditProduct } from "./pages/admin/editProduct/editProduct";
import StripeContainer from "./pages/Payment/stripeContainer";

function App() {
  return (
    <div className="App"> 
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />}/> {/* Main route for the shop */}
            <Route path="/shop" element={<ShopAddtoCart />}/> {/* Route for authenticated users */}
            <Route path="/cart" element={<Cart />}/> {/* Route for the cart */}
            <Route path="/login" element={<Login />}/> {/* Route for the login */}
            <Route path="/register" element={<Register />}/> {/* Route for the register */}
            <Route path="/editAdmin" element={<EditAdmin />}/> {/* Route for editing admin profile */}
            <Route path="/editInventory" element={<EditProduct />}/> {/* Route for editing inventory */}
            <Route path="/stripe" element={<StripeContainer />}/> {/* Route for payment page */}
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  )
}

export default App;
