import React, { useEffect, useState } from 'react';
import { User, Mail, Lock, ShoppingCart, Calendar, MapPin, Phone, CreditCard, Settings, Save, Package } from 'lucide-react';
import { ApiRequestGet } from '../../data/service/ApiRequestGet';
import { ApiRequestPost } from '../../data/service/ApiRequestPost';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',

    phone: '',
    dateOfBirth: '',

    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',

    paymentMethod: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',

    newsletter: false,
    notifications: false,
    orderUpdates: false
  });
  const handleSave = async () => {
    try {
      const response = await ApiRequestPost.updateUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        streetAddress: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        paymentMethod: formData.paymentMethod,
        cardNumber: formData.cardNumber,
        cardExpiry: formData.cardExpiry,
        cardCVV: formData.cardCVV,
        newsletter: formData.newsletter,
        notifications: formData.notifications,
        orderUpdates: formData.orderUpdates,
      });

      if (response.success) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong while updating profile.");
    }
  };



  const [cartItemsCount, setCartItemsCount] = useState(5);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [userData, setUserData] = useState([])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };



  const handlePasswordChange = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password updated successfully!');
    setShowPasswordFields(false);
  };

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await ApiRequestGet.getOneUser();
        if (response.success === true) {
          const u = response.user;
          setUserData(u);

          setFormData({
            name: u.name || '',
            email: u.email || '',
            password: '',
            confirmPassword: '',

            phone: u.phone || '',
            dateOfBirth: u.dateOfBirth ? u.dateOfBirth.split("T")[0] : '',

            streetAddress: u.streetAddress || '',
            city: u.city || '',
            state: u.state || '',
            zipCode: u.zipCode || '',
            country: u.country || '',

            paymentMethod: u.paymentMethod || 'Credit Card',
            cardNumber: u.cardNumber ? `**** **** **** ${u.cardNumber.slice(-4)}` : '',
            cardExpiry: u.cardExpiry || '',
            cardCVV: u.cardCVV ? '***' : '',

            newsletter: u.newsletter ?? true,
            notifications: u.notifications ?? true,
            orderUpdates: u.orderUpdates ?? true,
          });
        }
      } catch (error) {
        console.log("Error in:", error.message);
      }
    };

    handleFetch();
  }, []);



  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 text-center mb-6">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {formData.name}
              </h3>
              <p className="text-gray-600 mb-4">{formData.email}</p>
              <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors mb-3">
                Change Photo
              </button>

              <div className="bg-white rounded-lg p-4 mt-4 border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ShoppingCart className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Cart Items</span>
                  </div>
                  <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded-full">
                    {cartItemsCount}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 mt-3 border">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-600 mr-2" />
                  <div className="text-left">
                    <p className="text-xs text-gray-500">Member since</p>
                    <p className="text-sm font-medium text-gray-700">January 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-700 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Account Information</h2>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">Password</h3>
                    <button
                      onClick={() => setShowPasswordFields(!showPasswordFields)}
                      className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
                    >
                      <Lock className="w-4 h-4 mr-1" />
                      {showPasswordFields ? 'Cancel' : 'Change Password'}
                    </button>
                  </div>

                  {showPasswordFields && (
                    <div className="space-y-3 bg-white p-4 rounded-md border">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <button
                        onClick={handlePasswordChange}
                        className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm"
                      >
                        Update Password
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 text-gray-700 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 text-gray-700 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="India">India</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="w-5 h-5 text-gray-700 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Payment Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="**** **** **** 1234"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      name="cardCVV"
                      value={formData.cardCVV}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      placeholder="***"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  <CreditCard className="w-4 h-4 inline mr-1" />
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Settings className="w-5 h-5 text-gray-700 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Preferences</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    Subscribe to newsletter and promotional emails
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    Receive order updates and notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="orderUpdates"
                    checked={formData.orderUpdates}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    SMS alerts for order status changes
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-gray-900 text-white py-3 px-8 rounded-md hover:bg-gray-800 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;