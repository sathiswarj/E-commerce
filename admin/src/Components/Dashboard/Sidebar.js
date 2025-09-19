import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // clear token
    navigate("/"); // redirect to home/login
  };

  return (
    <aside className="w-64 bg-white shadow-lg h-screen p-6">
      <div className="text-xl font-bold border-b pb-4 mb-4">Admin</div>
      <nav className="flex flex-col gap-2">
        <Link to="/app/dashboard" className="py-2 px-4 rounded hover:bg-gray-200">
          Dashboard
        </Link>
        <Link to="/app/user-management" className="py-2 px-4 rounded hover:bg-gray-200">
          Users
        </Link>
        <Link to="/app/product-management" className="py-2 px-4 rounded hover:bg-gray-200">
          Products
        </Link>
        <button
          onClick={handleLogout}
          className="text-left py-2 px-4 rounded hover:bg-gray-200"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
