import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, Shield, UserCog, Settings } from 'lucide-react';
import { ApiRequestPost } from '../../data/service/ApiRequestPost';
export default function AdminOnboardingDialog({ isOpen, onClose, onUserCreated }) {
   const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer',
    isActive: true,
    isEmailVerified: false
  });

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';
    const allChars = uppercase + lowercase + numbers + symbols;
    
    let password = '';
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    for (let i = 4; i < 12; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    setFormData(prev => ({ ...prev, password }));
  };

  const roles = [
    { value: 'customer', label: 'Customer', desc: 'Regular customer with shopping access', icon: '🛒' },
    { value: 'admin', label: 'Admin', desc: 'Full system access and management', icon: '👑' },
    { value: 'super_admin', label: 'Super Admin', desc: 'Highest level access with all permissions', icon: '⚡' },
    { value: 'order_manager', label: 'Order Manager', desc: 'Manage orders, fulfillment, and shipping', icon: '📦' },
    { value: 'support', label: 'Support', desc: 'Customer support and ticket management', icon: '💬' },
    { value: 'inventory_manager', label: 'Inventory Manager', desc: 'Manage stock, products, and inventory', icon: '📊' },
    { value: 'finance_manager', label: 'Finance Manager', desc: 'Handle payments, refunds, and finances', icon: '💰' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
    try {
       if (!formData.name || !formData.email || !formData.password) {
        alert('Please fill in all required fields');
        return;
      }

       const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
      }

       if (formData.password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }

       if (formData.phone && !/^[0-9]{10,15}$/.test(formData.phone)) {
        alert('Please enter a valid phone number (10-15 digits)');
        return;
      }

       const response = await ApiRequestPost.addUsers(
        formData.name,
        formData.email,
        formData.password,
        formData.phone,
        formData.role,
        formData.isActive,
        formData.isEmailVerified
      );

      if (response) {
        alert(`User "${formData.name}" created successfully with role: ${formData.role}`);
        console.log('User created:', response);
        
         setFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          role: 'customer',
          isActive: true,
          isEmailVerified: false
        });
        
        onClose();
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      customer: 'bg-blue-100 text-blue-800 border-blue-300',
      admin: 'bg-purple-100 text-purple-800 border-purple-300',
      super_admin: 'bg-red-100 text-red-800 border-red-300',
      order_manager: 'bg-green-100 text-green-800 border-green-300',
      support: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      inventory_manager: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      finance_manager: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    };
    return colors[role] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-3">
                <Shield size={32} />
                <div>
                  <h2 className="text-2xl font-bold">Admin Panel - User Onboarding</h2>
                  <p className="text-indigo-100 text-sm mt-1">Create and assign user roles</p>
                </div>
              </div>
            </div>

             <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                    <User size={20} />
                    Basic Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Temporary Password *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
                        placeholder="Min. 6 characters"
                        required
                      />
                      <button
                        type="button"
                        onClick={generatePassword}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium whitespace-nowrap"
                      >
                        Generate
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">User will be prompted to change on first login</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="10-15 digits"
                    />
                  </div>

                  {/* Account Status */}
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Settings size={16} />
                      Account Settings
                    </h4>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">Account Active</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isEmailVerified"
                        checked={formData.isEmailVerified}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">Email Pre-verified</span>
                    </label>
                  </div>
                </div>

                {/* Right Column - Role Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2 mb-4">
                    <Shield size={20} />
                    Assign Role *
                  </h3>
                  
                  <div className="space-y-2">
                    {roles.map((role) => (
                      <label
                        key={role.value}
                        className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                          formData.role === role.value
                            ? getRoleColor(role.value) + ' border-current'
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={role.value}
                          checked={formData.role === role.value}
                          onChange={handleInputChange}
                          className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{role.icon}</span>
                            <span className="font-semibold text-gray-800">{role.label}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{role.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                   <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Selected Role Capabilities:</h4>
                    <p className="text-xs text-blue-800">
                      {roles.find(r => r.value === formData.role)?.desc}
                    </p>
                  </div>
                </div>
              </div>

               <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium shadow-lg"
                >
                  Create User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}