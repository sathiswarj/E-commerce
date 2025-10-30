import React, { useState } from "react";
import { ApiRequestPost } from "../../data/service/ApiRequestPost";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!name || !email || !password) {
      return setErrorMessage('All fields are required');
    }

    if (password.length < 6) {
      return setErrorMessage('Password must be at least 6 characters');
    }

    setLoading(true);
    try {
      const response = await ApiRequestPost.register(name, email, password);
      
      if (response.success) {
        setSuccessMessage(response.message);
        setShowOtpVerification(true);
      } else {
        setErrorMessage(response.message || 'Registration failed');
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!otp || otp.length !== 6) {
      return setErrorMessage('Please enter a valid 6-digit code');
    }

    setLoading(true);
    try {
      const response = await ApiRequestPost.verifyOTP( otp);
      
      if (response.success) {
        setSuccessMessage('Email verified! Redirecting to login...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setErrorMessage(response.message || 'Invalid verification code');
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (showOtpVerification) {
    return (
      <form onSubmit={handleVerifyOtp} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="text-3xl prata-regular">Verify Email</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {errorMessage && (
          <div className="w-full bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded text-sm">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="w-full bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded text-sm">
            {successMessage}
          </div>
        )}

        <p className="text-sm text-gray-600 text-center">
          We've sent a verification code to <strong>{email}</strong>
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit code"
          className="w-full px-3 py-2 border border-gray-800 rounded text-center text-2xl tracking-widest"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          maxLength={6}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white font-light px-8 py-2 mt-4 w-full rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>

        <button
          type="button"
          onClick={() => setShowOtpVerification(false)}
          className="text-sm text-blue-600 hover:underline"
        >
          Back to registration
        </button>
      </form>
    );
  }

  return (
    <>
      <form onSubmit={handleRegister} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="text-3xl prata-regular">Sign Up</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {errorMessage && (
          <div className="w-full bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded text-sm">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="w-full bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded text-sm">
            {successMessage}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-3 py-2 border border-gray-800 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white font-light px-8 py-2 mt-4 w-full rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      
   <div className="text-center mt-4">
  <p className="text-md text-gray-600">
    Already have an account?{' '}
    <Link to="/" className="text-blue-600 hover:underline font-medium">
      Login
    </Link>
  </p>
</div>
    </>
  );
};

export default SignUp;