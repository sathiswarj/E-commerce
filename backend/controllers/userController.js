import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (user) => {
   return jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.status(400).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = generateToken(user);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await userModel.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({ name, email, password: hashedPassword });

    if (user) {
      return res.status(201).json({ success: true, message: 'User registered successfully. Please log in.' });
    }

    return res.status(400).json({ success: false, message: 'User not created' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
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

    console.log('Updating user:', userId);
    console.log('Request body:', req.body);

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

export { loginUser, registerUser, getAllUsers, addUser, getOneUser };
