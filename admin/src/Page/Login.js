 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiRequestPost } from "../data/service/ApiRequestPost"; 

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      return setErrorMessage("Please enter both email and password");
    }

    try {
      const response = await ApiRequestPost.login(email, password);  

      if (response.success) {
        localStorage.setItem("adminToken", response.token); 
        navigate("/app/dashboard");  
      } else {
        setErrorMessage(response.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox h-4 w-4" />
              Remember me
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
 