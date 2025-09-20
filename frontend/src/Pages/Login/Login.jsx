import React, { useState } from "react";
import { ApiRequestPost } from "../../data/service/ApiRequestPost";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Register function
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return setErrorMessage("All fields are required");
    }
    try {
      const response = await ApiRequestPost.register(name, email, password);
      if (response.success === true) {
        console.log("✅ User registered");
        setCurrentState("Login"); // Switch to login form
        setErrorMessage("");      // Clear errors
      } else {
        setErrorMessage(response.message || "Registration failed");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setErrorMessage("Email and password are required");
    }
    try {
      const response = await ApiRequestPost.login(email, password);
      if (response.success === true) {
        console.log("✅ User logged in");
        localStorage.setItem("authToken", response.token);
        navigate("/home");
      } else {
        setErrorMessage(response.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form
      onSubmit={currentState === "Login" ? handleLogin : handleRegister}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

      {currentState === "Sign Up" && (
        <input
          type="text"
          placeholder="Name"
          className="w-full px-3 py-2 border border-gray-800"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 border border-gray-800"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full px-3 py-2 border border-gray-800"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your Password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer"
      >
        {currentState === "Login" ? "Sign in" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
