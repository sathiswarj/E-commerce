import productModel from '../models/productModel.js';
import userModel from '../models/userModel.js';

const addToCart = async (req, res) => {  
  try {   
    const { productId, quantity = 1, size, color } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    // Check product exists and has stock
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

    // Find user
    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Initialize cartData if it doesn't exist
    if (!user.cartData) {
      user.cartData = {};
    }

    // Create cart item key (include size/color if applicable)
    const cartKey = size || color 
      ? `${productId}_${size || ''}_${color || ''}` 
      : productId;

    // Add or update cart item
    if (user.cartData[cartKey]) {
      user.cartData[cartKey] += quantity;
    } else {
      user.cartData[cartKey] = quantity;
    }

     user.markModified('cartData');
    
    await user.save();  //  

     const cartItemCount = Object.values(user.cartData).reduce((a, b) => a + b, 0);

    return res.status(200).json({
      success: true,
      message: 'Product added to cart',
      cartData: user.cartData,
      cartItemCount
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

    const cartData = user.cartData || {};
    const cartItems = [];
    let totalAmount = 0;
    let totalItems = 0;

     for (const [key, quantity] of Object.entries(cartData)) {
      if (quantity > 0) {
         const productId = key.split('_')[0];
        const size = key.split('_')[1] || null;
        const color = key.split('_')[2] || null;

        const product = await productModel.findOne({ productId });

        if (product) {
          const itemTotal = product.price * quantity;
          totalAmount += itemTotal;
          totalItems += quantity;

          cartItems.push({
            productId: product.productId,
            name: product.name,
            price: product.price,
            image: product.image1 || product.images?.[0],
            quantity,
            size,
            color,
            itemTotal,
            stock: product.stock,
            cartKey: key
          });
        }
      }
    }

    return res.status(200).json({
      success: true,
      cartItems,
      totalItems,
      totalAmount,
      cartData
    });

  } catch (error) {
    console.error('Get cart error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch cart' 
    });
  }
};

// Update cart item quantity
const updateCart = async (req, res) => {
  try {
    const { cartKey, quantity } = req.body;
    const userId = req.user.userId;

    if (!cartKey || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Cart key and quantity are required'
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

     const productId = cartKey.split('_')[0];
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

     if (quantity === 0) {
      delete user.cartData[cartKey];
    } else {
      user.cartData[cartKey] = quantity;
    }

    user.markModified('cartData');
    await user.save();

    const cartItemCount = Object.values(user.cartData).reduce((a, b) => a + b, 0);

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
 
    
    const { cartKey } = req.params;
    const userId = req.user.userId;

    if (!cartKey) {
      return res.status(400).json({
        success: false,
        message: 'Cart key is required'
      });
    }

    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    delete user.cartData[cartKey];

    user.markModified('cartData');
    await user.save();

    const cartItemCount = Object.values(user.cartData).reduce((a, b) => a + b, 0);

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

    user.cartData = {};
    user.markModified('cartData');
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Cart cleared',
      cartData: {},
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