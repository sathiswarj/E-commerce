import express from 'express';
import { loginUser, registerUser, getAllUsers,addUser, getOneUser } from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.put('/adduser', authMiddleware, addUser)
router.get('/getuser', authMiddleware, getOneUser)
router.get('/getAllUsers', getAllUsers)
export default router;