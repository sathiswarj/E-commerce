import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

 const generateToken = (user) => {
   return jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

 const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.status(400).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = generateToken(user);
    return res.status(200).json({ 
      success: true, 
      token,
      userId: user._id,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error(error);
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

     const user = await userModel.create({ 
      name, 
      email, 
      password: hashedPassword,
      phone: phone || undefined,                   
      role: role || 'customer',                   
      isActive: isActive !== undefined ? isActive : true,   
      isEmailVerified: isEmailVerified || false      
    });

    if (user) {
       const userData = {
        _id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt
      };

      return res.status(201).json({ 
        success: true, 
        message: 'User registered successfully.', 
        data: userData 
      });
    }

    return res.status(400).json({ 
      success: false, 
      message: 'User not created' 
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
      phone,
      dateOfBirth,
      streetAddress,
      city,
      state,
      zipCode,
      country,
      paymentMethod,
      cardNumber,
      cardExpiry,
      cardCVV,
      newsletter,
      notifications,
      orderUpdates
    } = req.body;

     if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;
    if (streetAddress !== undefined) user.streetAddress = streetAddress;
    if (city !== undefined) user.city = city;
    if (state !== undefined) user.state = state;
    if (zipCode !== undefined) user.zipCode = zipCode;
    if (country !== undefined) user.country = country;
    if (paymentMethod !== undefined) user.paymentMethod = paymentMethod;
    if (cardNumber !== undefined) user.cardNumber = cardNumber;
    if (cardExpiry !== undefined) user.cardExpiry = cardExpiry;
    if (cardCVV !== undefined) user.cardCVV = cardCVV;
    if (newsletter !== undefined) user.newsletter = newsletter;
    if (notifications !== undefined) user.notifications = notifications;
    if (orderUpdates !== undefined) user.orderUpdates = orderUpdates;

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
    const userId = req.user.userId; 
    const user = await userModel.findOne({ userId }); 

    if (user) {
      const { password, _id, ...userWithoutPassword } = user.toObject();
      return res.status(200).json({ success: true, message: "User data fetched", user: userWithoutPassword });
    }

    return res.status(404).json({ success: false, message: 'User not found' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch user data', error: error.message });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Find user by email
    const user = await userModel.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set OTP expiry (10 minutes from now)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Delete any existing OTP for this email
    await otpModel.deleteMany({ email: email.toLowerCase() });

    // Create new OTP record
    await otpModel.create({
      email: email.toLowerCase(),
      otp: otp,
      expiresAt: expiresAt
    });

    // Send OTP via email
    const emailResult = await sendResetOtpEmail(email, otp);

    if (!emailResult.success) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send verification email. Please try again.' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Verification code sent to your email' 
    });

  } catch (error) {
    console.error('Request password reset error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Verify OTP
export const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    // Find OTP record
    const otpRecord = await otpModel.findOne({ 
      email: email.toLowerCase(),
      otp: otp
    });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'Invalid verification code' });
    }

    // Check if OTP is expired
    if (new Date() > otpRecord.expiresAt) {
      await otpModel.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ success: false, message: 'Verification code has expired. Please request a new one.' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Verification code verified successfully' 
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    // Verify OTP one more time
    const otpRecord = await otpModel.findOne({ 
      email: email.toLowerCase(),
      otp: otp
    });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'Invalid verification code' });
    }

    if (new Date() > otpRecord.expiresAt) {
      await otpModel.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ success: false, message: 'Verification code has expired' });
    }

    // Find user
    const user = await userModel.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    user.password = hashedPassword;
    user.updatedAt = new Date();
    await user.save();

    // Delete OTP record after successful password reset
    await otpModel.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({ 
      success: true, 
      message: 'Password reset successfully' 
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Change password (for logged-in users)
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId; // From auth middleware

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long' });
    }

    // Find user with password field
    const user = await userModel.findOne({ userId: userId }).select('+password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    // Check if new password is same as old
    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res.status(400).json({ success: false, message: 'New password must be different from current password' });
    }

    // Hash and update password
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
