import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrder,
  cancelOrder,
  getAllOrders,
  updateOrder
} from '../controllers/orderController.js';
import authMiddleware from '../middlewares/auth.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';
const orderRouter = express.Router();

// User routes
orderRouter.post('/', authMiddleware, createOrder);
orderRouter.get('/my-orders', authMiddleware, getMyOrders);
orderRouter.get('/:orderId', authMiddleware, getOrder);
orderRouter.post('/:orderId/cancel', authMiddleware, cancelOrder);

// Admin routes
orderRouter.get('/', authMiddleware, verifyAdmin, getAllOrders);
orderRouter.put('/:orderId', authMiddleware, verifyAdmin, updateOrder);

export default orderRouter;