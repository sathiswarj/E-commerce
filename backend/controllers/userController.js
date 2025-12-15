import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendResetOtpEmail } from '../service/emailService.js';
 
const generateToken = (user) => {
   return jwt.sign(
     { 
       userId: user.userId,
       email: user.email,
       role: user.role,
       name: user.name
     }, 
     process.env.JWT_SECRET, 
     { expiresIn: '30d' }
   );
};

const loginUser = async (req, res) => {
  try {
     
    const { email, password } = req.body;
    
    const user = await userModel.findOne({ email }).select('+password');
    
 
    if (!user) return res.status(400).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
     
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = generateToken(user);
     
    user.lastLogin = new Date();
    await user.save();
    
    return res.status(200).json({ 
      success: true, 
      token,
       user: {
        id: user._id,
        userId: user.userId,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const registerUser = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      phone, 
      role, 
      isActive, 
      isEmailVerified 
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and password are required' 
      });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
     const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    console.log('Creating user with OTP:', otp);
    console.log('OTP will expire at:', otpExpiresAt);

    const user = await userModel.create({ 
      name, 
      email, 
      password: hashedPassword,
      phone: phone || undefined,                   
      role: role || 'customer', 
      otp: otp,
      otpExpiresAt: otpExpiresAt,                  
      isActive: isActive !== undefined ? isActive : true,   
      isEmailVerified: isEmailVerified || false      
    });
    
    await sendResetOtpEmail(email, otp);  

    return res.status(200).json({
      success: true,
      message: 'Verification code sent to your email',
      email: email  // Send email back so frontend can use it for verification
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const addUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await userModel.findOne({ userId });

    if (!user) {
      console.log('User not found:', userId);
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const {
      name,
      email,  
      phone,
      dateOfBirth,
      streetAddress,
      city,
      state,
      zipCode,
      country,
      paymentMethod,
      newsletter,
      notifications,
      orderUpdates
    } = req.body;

    if (name !== undefined) user.name = name;
     if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;
    if (streetAddress !== undefined) user.address.street = streetAddress;
    if (city !== undefined) user.address.city = city;
    if (state !== undefined) user.address.state = state;
    if (zipCode !== undefined) user.address.zipCode = zipCode;
    if (country !== undefined) user.address.country = country;
    if (paymentMethod !== undefined) user.paymentMethod = paymentMethod;
    if (newsletter !== undefined) user.preferences.newsletter = newsletter;
    if (notifications !== undefined) user.preferences.notifications = notifications;
    if (orderUpdates !== undefined) user.preferences.orderUpdates = orderUpdates;

    const savedUser = await user.save();
    console.log('User updated successfully:', savedUser.userId);

    const { password, _id, ...userData } = savedUser.toObject();

    return res.status(200).json({ 
      success: true, 
      message: 'User data updated successfully', 
      user: userData
    });

  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to update user data', 
      error: error.message 
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { userId: queryUserId } = req.query;
    const tokenUserId = req.user.userId;
    const tokenEmail = req.user.email;

    let user;

    if (req.user.role === 'admin' || req.user.role === 'super_admin') {
      if (queryUserId) {
        user = await userModel.findOne({ userId: queryUserId });
      } else if (tokenEmail) {
        user = await userModel.findOne({ email: tokenEmail });
      } else {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide userId in query params' 
        });
      }
    } else {
      if (!tokenUserId) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid token' 
        });
      }
      user = await userModel.findOne({ userId: tokenUserId });
    }

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const { password, _id, ...userWithoutPassword } = user.toObject();
    return res.status(200).json({ 
      success: true, 
      message: "User data fetched", 
      user: userWithoutPassword 
    });

  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch user data', 
      error: error.message 
    });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const user = await userModel.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Update user with new OTP and set expiry time explicitly
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    console.log('OTP set:', otp);
    console.log('OTP expires at:', user.otpExpiresAt);
    console.log('Current time:', new Date());

    await sendResetOtpEmail(email, otp);

    return res.status(200).json({
      success: true,
      message: 'Verification code sent to your email'
    });

  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send verification email. Please try again.' 
    });
  }
};

// Verify OTP for Email Verification (Registration)
export const verifyEmailOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    if (  !otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and OTP are required' 
      });
    }

    const user = await userModel.findOne({ 
       otp: otp 
    });

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid verification code' 
      });
    }


    if (!user.otpExpiresAt || new Date() > user.otpExpiresAt) {
      return res.status(400).json({ 
        success: false, 
        message: 'Verification code has expired. Please request a new one.' 
      });
    }

 
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

     const token = generateToken(user);

    return res.status(200).json({ 
      success: true, 
      message: 'Email verified successfully',
      token,
      user: {
        userId: user.userId,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Verify Email OTP error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

 export const verifyResetOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'OTP is required' 
      });
    }

    const user = await userModel.findOne({ otp: otp });

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid verification code' 
      });
    }

    console.log('User found with OTP');
    console.log('OTP expires at:', user.otpExpiresAt);
    console.log('Current time:', new Date());
    console.log('Is expired?', new Date() > user.otpExpiresAt);

    if (!user.otpExpiresAt || new Date() > user.otpExpiresAt) {
      return res.status(400).json({ 
        success: false, 
        message: 'Verification code has expired. Please request a new one.' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Verification code verified successfully',
      email: user.email
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    const user = await userModel.findOne({ 
      email: email.toLowerCase(),
      otp: otp
    }).select('+password');

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid verification code' });
    }

    if (!user.otpExpiresAt || new Date() > user.otpExpiresAt) {
      return res.status(400).json({ success: false, message: 'Verification code has expired' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    user.updatedAt = new Date();
    await user.save();

    return res.status(200).json({ 
      success: true, 
      message: 'Password reset successfully' 
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long' });
    }

    const user = await userModel.findOne({ userId: userId }).select('+password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res.status(400).json({ success: false, message: 'New password must be different from current password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.updatedAt = new Date();
    await user.save();

    return res.status(200).json({ 
      success: true, 
      message: 'Password changed successfully' 
    });

  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export { loginUser, registerUser, getAllUsers, addUser, getOneUser };