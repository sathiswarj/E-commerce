import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Collection from "./Pages/Collection";
import About from "./pages/About";
import Contact from "./Pages/Contact";
import Product from './Pages/Product/Product'
import Cart from './Pages/Cart/Cart'
import Login from "./Pages/Login/Login";
import PlaceOrder from './Pages/Cart/PlaceOrder'
import Orders from "./Pages/Orders";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import SearchBar from "./components/SearchBar";
import Profile from './Pages/Profile/Profile'
import { useLocation } from "react-router-dom";
import Signup from './Pages/Signup/Signup'
 const App = () => {
  const isProfile = location.pathname === "/profile"
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
         <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
 
      </Routes>
      {!isProfile && <Footer />}
    </div>
  );
};

export default App;
