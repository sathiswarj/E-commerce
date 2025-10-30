import React, { useState } from "react";
import { ApiRequestPost } from "../../data/service/ApiRequestPost";
import { useNavigate,Link } from "react-router-dom";

 const LoginForm = ({ onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email || !password) {
      return setErrorMessage('Email and password are required');
    }

    setLoading(true);
    try {
      const response = await ApiRequestPost.login({email, password})      
      if (response.success) {
        localStorage.setItem('authToken', response.token);
        navigate('/home');
      } else {
        setErrorMessage(response.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
    <form onSubmit={handleLogin} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl prata-regular">Login</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {errorMessage && (
        <div className="w-full bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded text-sm">
          {errorMessage}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 border border-gray-800 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full px-3 py-2 border border-gray-800 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p onClick={onForgotPassword} className="cursor-pointer text-blue-600 hover:underline">
          Forgot your Password?
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white font-light px-8 py-2 mt-4 w-full rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
        <div className="text-center mt-4">
  <p className="text-md text-gray-600">
    Don't have an account?{' '}
    <Link to="/signup" className="text-blue-600 hover:underline font-medium">
      Sign Up
    </Link>
  </p>
</div>
   </>
  );
};

export default LoginForm;
