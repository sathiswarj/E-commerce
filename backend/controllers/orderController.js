import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// Create order
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userEmail = req.user.email;
    const userName = req.user.name;

    const { orderItems, totalPrice, shippingAddress, paymentMethod } = req.body;

    const order = await orderModel.create({
      userId,
      userEmail,
      userName,
      orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod: paymentMethod || "Cash on Delivery",
      paymentStatus: "Pending"
    });

    // Clear cart
    const user = await userModel.findOne({ userId });
    if (user) {
      user.cartData = [];
      await user.save();
    }

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });

  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
};

// Get my orders
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Get orders error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
};

// Get single order
export const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderModel.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    return res.status(200).json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Get order error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch order'
    });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderModel.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.orderStatus === 'Shipped' || order.orderStatus === 'Delivered') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel this order'
      });
    }

    order.orderStatus = 'Cancelled';
    await order.save();

    return res.status(200).json({
      success: true,
      message: 'Order cancelled',
      order
    });

  } catch (error) {
    console.error('Cancel order error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to cancel order'
    });
  }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Get all orders error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
};

// Update order status (Admin)
export const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const order = await orderModel.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.orderStatus = orderStatus;
    await order.save();

    return res.status(200).json({
      success: true,
      message: 'Order updated',
      order
    });

  } catch (error) {
    console.error('Update order error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update order'
    });
  }
};