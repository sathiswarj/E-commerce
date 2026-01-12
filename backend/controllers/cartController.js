import productModel from '../models/productModel.js';
import userModel from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';

const addToCart = async (req, res) => {  
  try {
    const { productId, quantity = 1, size, color } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const product = await productModel.findOne({ productId });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

     if (!Array.isArray(user.cartData)) {
      user.cartData = [];
    }

    const existingItemIndex = user.cartData.findIndex(
      item => item.productId === productId && 
              item.size === size && 
              item.color === color
    );

    if (existingItemIndex > -1) {
      user.cartData[existingItemIndex].quantity += quantity;
    } else {
      const newCartItem = {
        cartId: uuidv4(),
        userId: String(userId), 
        productId: String(product.productId), 
        name: String(product.name || 'Unknown Product'),
        price: Number(product.price) || 0,
        category: String(product.category || ''),
        quantity: Number(quantity),
        image: String(product.image1 || product.image || product.images?.[0]),
      };
      
      if (size) newCartItem.size = String(size);
      if (color) newCartItem.color = String(color);
      
      user.cartData.push(newCartItem);
    }

    user.markModified('cartData');
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Product added to cart',
    });

  } catch (error) {
    console.error('Add to cart error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to add to cart',
      error: error.message 
    });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const cartData = Array.isArray(user.cartData) ? user.cartData : [];
    const cartItems = [];
    let totalAmount = 0;

    for (const cartItem of cartData) {
       if (cartItem.quantity > 0 && cartItem.productId && cartItem.price !== undefined) {
        const itemTotal = cartItem.price * cartItem.quantity;
        totalAmount += itemTotal;

        cartItems.push({
          cartId: cartItem.cartId,
          userId: cartItem.userId,
          productId: cartItem.productId,
          name: cartItem.name,
          price: cartItem.price,
          category: cartItem.category,
          image: cartItem.image,
           quantity: cartItem.quantity,
          size: cartItem.size,
          color: cartItem.color,
          itemTotal
        });
      }
    }

    const totalItems = cartItems.length;

    return res.status(200).json({
      success: true,
      cartItems,
      totalItems,
      totalAmount
    });

  } catch (error) {
    console.error('Get cart error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch cart' 
    });
  }
};

const updateCart = async (req, res) => {
  try {
    
  const { productId } = req.params;  
    const { quantity } = req.body;    
    const userId = req.user.userId;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and quantity are required'
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity cannot be negative'
      });
    }

    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const product = await productModel.findOne({ productId });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`
      });
    }

    if (!Array.isArray(user.cartData)) {
      user.cartData = [];
    }

    const itemIndex = user.cartData.findIndex(
      item => item.productId === productId );

    if (itemIndex > -1) {
      if (quantity === 0) {
        user.cartData.splice(itemIndex, 1);
      } else {
        user.cartData[itemIndex].quantity = quantity;
      }
    } else if (quantity > 0) {
      const cartItem = {
        cartId: uuidv4(),
        userId: userId,
        productId: product.productId,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        subCategory: product.subCategory,
        bestseller: product.bestseller,
        stock: product.stock,
        quantity: quantity,
        image: product.image1 || product.images?.[0] || 'default.jpg',
        images: product.images || []
      };
      
      if (size) cartItem.size = size;
      if (color) cartItem.color = color;
      
      user.cartData.push(cartItem);
    }

    user.markModified('cartData');
    await user.save();

    const cartItemCount = user.cartData.reduce((total, item) => total + item.quantity, 0);

    return res.status(200).json({
      success: true,
      message: quantity === 0 ? 'Item removed from cart' : 'Cart updated',
      cartData: user.cartData,
      cartItemCount
    });

  } catch (error) {
    console.error('Update cart error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to update cart' 
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
     const userId = req.user.userId;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    if (!Array.isArray(user.cartData)) {
      user.cartData = [];
    }

    user.cartData = user.cartData.filter(
      item => item.productId !== productId)

    user.markModified('cartData');
    await user.save();

    const cartItemCount = user.cartData.reduce((total, item) => total + item.quantity, 0);

    return res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      cartData: user.cartData,
      cartItemCount
    });

  } catch (error) {
    console.error('Remove from cart error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to remove from cart' 
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    user.cartData = [];
    user.markModified('cartData');
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Cart cleared',
      cartData: [],
      cartItemCount: 0
    });

  } catch (error) {
    console.error('Clear cart error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to clear cart' 
    });
  }
};

export { addToCart, getCart, updateCart, removeFromCart, clearCart };