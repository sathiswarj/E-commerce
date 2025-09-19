import express from 'express';
import { addProduct,getAllProducts,getProduct,deleteProduct,updateProduct } from '../controllers/productController.js';
import upload from '../middlewares/multer.js';
import authMiddleware from '../middlewares/auth.js';
const router = express.Router();

router.post('/', upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1},{name:'image3', maxCount:1}, {name:'image4', maxCount:1}]), addProduct);
router.get('/',authMiddleware, getAllProducts);
router.get('/:id', authMiddleware, getProduct);
router.put('/:id',authMiddleware, updateProduct);
router.delete('/:id',authMiddleware, deleteProduct);

export default router;