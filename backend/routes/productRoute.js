import express from 'express';
import {
  addProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productController.js';
import upload from '../middlewares/multer.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

 router.post(
  '/',
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);

 router.get('/', authMiddleware, getAllProducts);
router.get('/:productId', authMiddleware, getProduct);
router.patch('/:productId', authMiddleware, upload.any(), updateProduct);
router.delete('/:productId', authMiddleware, deleteProduct);

export default router;
