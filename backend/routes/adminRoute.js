import { adminLogin } from "../controllers/adminController.js";
import express from 'express';

const router = express.Router();

router.post('/adminlogin', adminLogin);

export default router;
