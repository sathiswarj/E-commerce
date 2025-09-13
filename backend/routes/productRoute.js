import express from 'express';
import { addProduct,getAllProducts,getProduct,deleteProduct,updateProduct } from '../controllers/productController.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/', upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1},{name:'image3', maxCount:1}, {name:'image4', maxCount:1}]), addProduct);
router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;