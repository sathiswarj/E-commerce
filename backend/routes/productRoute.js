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

 
router.get('/', verifyAdmin, getAllProducts);   
router.get('/:productId', getProduct);   

 router.post(
  '/',  
  verifyAdmin,     
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct 
);

router.patch(
  '/:productId',
  authMiddleware, 
  verifyAdmin,     
  upload.any(),
  updateProduct
);

router.delete(
  '/:productId',
  authMiddleware,   
  verifyAdmin,      
  deleteProduct
);

export default router;