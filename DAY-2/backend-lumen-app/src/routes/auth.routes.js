import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
} from '../controllers/auth.controller.js';
import {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
  validatePasswordChange
} from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes



router.post('/register', validateRegistration, register);  //Sign-Up Endpoint
router.post('/login', validateLogin, login);





// Protected routes (require authentication)
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, validateProfileUpdate, updateProfile);
router.put('/change-password', authenticateToken, validatePasswordChange, changePassword);

export default router;
