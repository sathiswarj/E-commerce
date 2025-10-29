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
const router = express.Router();

 router.post(
  '/',
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  verifyAdmin, addProduct 
);

 router.get('/', verifyAdmin, getAllProducts);
router.get('/:productId', verifyAdmin, getProduct);
router.patch('/:productId', verifyAdmin, upload.any(), updateProduct);
router.delete('/:productId', verifyAdmin, deleteProduct);

export default router;
