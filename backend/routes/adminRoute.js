import { adminLogin } from "../controllers/adminController.js";
import express from 'express';
import verifyAdmin from "../middlewares/verifyAdmin.js";
import { addUser, getOneUser, getAllUsers } from "../controllers/userController.js";
const router = express.Router();

router.post('/adminlogin', adminLogin);
router.put('/adduser', verifyAdmin, addUser)
router.get('/getuser', verifyAdmin, getOneUser)
router.get('/getAllUsers', verifyAdmin,getAllUsers)
export default router;
