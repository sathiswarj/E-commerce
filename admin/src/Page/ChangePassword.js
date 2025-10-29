import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft, Mail } from 'lucide-react';
import { ApiRequestPost } from '../data/service/ApiRequestPost';

export default function PasswordResetFlow({ onBack }) {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailSubmit = async () => {
    setError('');
    setSuccess('');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Using your API wrapper - make sure to import ApiRequestPost
      const response = await ApiRequestPost.requestPasswordReset({ email });

      if (response.success) {
        setSuccess('Verification code sent to your email!');
        setTimeout(() => {
          setStep(2);
          setSuccess('');
        }, 1500);
      } else {
        setError(response.message || 'Failed to send verification code');
      }
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setError('');
    setSuccess('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);

    try {
      // Using your API wrapper
      const response = await ApiRequestPost.verifyResetOtp({ email, otp });

      if (response.success) {
        setSuccess('Code verified successfully!');
        setTimeout(() => {
          setStep(3);
          setSuccess('');
        }, 1500);
      } else {
        setError(response.message || 'Invalid verification code');
      }
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setError('');
    setSuccess('');

    if (!formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Using your API wrapper
      const response = await ApiRequestPost.resetPassword({
        email,
        otp,
        newPassword: formData.newPassword
      });

      if (response.success) {
        setSuccess('Password reset successfully!');
        setTimeout(() => {
          if (onBack) onBack();
        }, 2000);
      } else {
        setError(response.message || 'Failed to reset password');
      }
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Using your API wrapper
      const response = await ApiRequestPost.requestPasswordReset({ email });

      if (response.success) {
        setSuccess('New verification code sent!');
      } else {
        setError(response.message || 'Failed to resend code');
      }
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft size={20} />
              Back to Login
            </button>
          )}
          <h1 className="text-3xl font-bold text-gray-800">Reset Password</h1>
          <p className="text-gray-600 mt-2">
            {step === 1 && "Enter your email to receive a verification code"}
            {step === 2 && "Enter the code sent to your email"}
            {step === 3 && "Create your new password"}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <Lock size={28} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Password Recovery</h2>
                <p className="text-indigo-100 text-sm mt-1">Step {step} of 3</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {success && (
              <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
                <CheckCircle size={20} className="text-green-600" />
                <p className="text-sm text-green-800 font-medium">{success}</p>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                <AlertCircle size={20} className="text-red-600" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Step 1: Email Input */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter your email"
                      onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                    />
                  </div>
                </div>

                <button
                  onClick={handleEmailSubmit}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? 'Sending...' : 'Send Verification Code'}
                </button>
              </div>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Code *
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center text-2xl tracking-widest font-mono"
                    placeholder="000000"
                    maxLength={6}
                    onKeyPress={(e) => e.key === 'Enter' && handleOtpSubmit()}
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Code sent to {email}
                  </p>
                </div>

                <button
                  onClick={handleOtpSubmit}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                </button>

                <button
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Resend Code
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="w-full text-sm text-gray-600 hover:text-gray-700"
                >
                  Change Email
                </button>
              </div>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-blue-900 mb-3">Password Requirements:</p>
                  <ul className="space-y-2">
                    <li className={`flex items-center gap-2 text-sm ${formData.newPassword.length >= 6 ? "text-green-600" : "text-blue-800"}`}>
                      <span className="text-lg">{formData.newPassword.length >= 6 ? "✓" : "○"}</span>
                      Minimum 6 characters
                    </li>
                    <li className={`flex items-center gap-2 text-sm ${formData.newPassword === formData.confirmPassword && formData.confirmPassword ? "text-green-600" : "text-blue-800"}`}>
                      <span className="text-lg">{formData.newPassword === formData.confirmPassword && formData.confirmPassword ? "✓" : "○"}</span>
                      Passwords match
                    </li>
                  </ul>
                </div>

                <button
                  onClick={handlePasswordReset}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? 'Resetting Password...' : 'Reset Password'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 flex justify-center gap-2">
          <div className={`h-2 w-16 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
          <div className={`h-2 w-16 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
          <div className={`h-2 w-16 rounded-full ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
        </div>
      </div>
    </div>
  );
}