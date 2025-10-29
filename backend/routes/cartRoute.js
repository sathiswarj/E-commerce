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

router.patch('/:id', authMiddleware, updateCart);

 router.delete('/:cartKey', authMiddleware, removeFromCart);

 router.delete('/clear', authMiddleware, clearCart);

export default router;
