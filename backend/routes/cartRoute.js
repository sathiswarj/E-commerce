import express from 'express';
import { 
  getCart, 
  addToCart, 
  updateCart, 
  removeFromCart, 
  clearCart 
} from '../controllers/cartController.js';   
import authMiddleware from '../middlewares/auth.js';  

const router = express.Router();

 router.post('/', authMiddleware, addToCart);

 router.get('/', authMiddleware, getCart);

 router.patch('/:productId', authMiddleware, updateCart);

 
router.delete('/clear', authMiddleware, clearCart);

 router.delete('/:productId', authMiddleware, removeFromCart);

export default router;