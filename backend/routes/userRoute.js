import express from 'express';
import { 
  loginUser, 
  registerUser, 
  getAllUsers,
  addUser, 
  getOneUser,
  requestPasswordReset, 
  verifyResetOtp, 
  resetPassword,
  changePassword, 
  verifyEmailOtp
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const router = express.Router();
router.post('/login', loginUser);
router.post('/register', registerUser);

router.put('/adduser', authMiddleware, addUser);
 router.get('/getuser', authMiddleware, getOneUser); 
router.get('/admin/getuser/:userId', authMiddleware, verifyAdmin, getOneUser);  
router.get('/getAllUsers', authMiddleware, verifyAdmin, getAllUsers);

router.post('/request-password-reset', requestPasswordReset);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/verify-email-otp', verifyEmailOtp);

router.post('/reset-password', resetPassword);

router.post('/change-password', authMiddleware, changePassword);

export default router;