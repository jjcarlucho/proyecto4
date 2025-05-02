import { Router } from 'express';
import { register, login, forgotPassword, resetPassword } from '../controllers/authController';
import { googleLogin } from '../controllers/googleAuthController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/google', googleLogin);

export default router; 