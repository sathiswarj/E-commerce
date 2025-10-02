import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
 
const Navbar = () => {
  const [visible, setvisible] = useState(false);
    
  const Navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    Navigate("/")
  };

  return (
    <div className="flex justify-between items-center py-5 font-medium ">
      {/* Logo */}
      <Link to="/home">
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>

      {/* Nav links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/home" className="flex flex-col items-center gap-1">
          <p>HOME</p>
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
        </NavLink>
      </ul>

      {/* Right section */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
        />

           <div className="group relative">
            <Link to="/home">
              <img
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
                alt="profile"
              />
            </Link>

            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-gray-700">
                <Link to="/profile" className="cursor-pointer hover:text-black">My Profile</Link>
                <p className="cursor-pointer hover:text-black">Orders</p>
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
    

         <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          <p className="absolute w-4 right-[-5px] bottom-[-5px] text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {/* {getCartCount()} */}
          </p>
        </Link>

        {/* Mobile menu */}
        <img
          onClick={() => setvisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu"
        />
      </div>

      {/* Sidebar for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setvisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setvisible(false)}
            to="/home"
            className="py-2 pl-6 border"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setvisible(false)}
            to="/collection"
            className="py-2 pl-6 border"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setvisible(false)}
            to="/about"
            className="py-2 pl-6 border"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setvisible(false)}
            to="/contact"
            className="py-2 pl-6 border"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
