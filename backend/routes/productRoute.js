import express from 'express';
import {
  addProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productController.js';
import upload from '../middlewares/multer.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

 router.get('/', getAllProducts);   
router.get('/:productId', getProduct);   

 router.post(
  '/',  
  authMiddleware,
  verifyAdmin,     
  upload.fields([
    { name: 'images', maxCount: 3 },   
    { name: 'heroImages', maxCount: 4 },  
  ]),
  addProduct 
);

router.patch(
  '/:productId',
  authMiddleware, 
  verifyAdmin,     
  upload.fields([
    { name: 'images', maxCount: 3 },      
    { name: 'heroImages', maxCount: 4 },   
  ]),
  updateProduct
);

router.delete(
  '/:productId',
  authMiddleware,   
  verifyAdmin,      
  deleteProduct
);

export default router;