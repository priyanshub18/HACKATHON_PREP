import express from 'express';
import {
  getAllUsers,
  deleteUser,
  getStaff,
  updateUserRole,
  getMyData,
  staffOperations,
  managerOperations,
  adminOperations
} from '../controllers/role.controller.js';
import {
  authenticateToken,
  adminOnly,
  managerAndAdmin,
  staffAndAbove
} from '../middleware/auth.js';
import { body } from 'express-validator';

const router = express.Router();

// All authenticated users can access
router.get('/my-data', authenticateToken, getMyData);

// Staff level access
router.get('/staff-operations', authenticateToken, staffOperations);

// Manager and Admin access
router.get('/staff', authenticateToken, managerAndAdmin, getStaff);
router.put('/user/:userId/role', 
  authenticateToken, 
  managerAndAdmin,
  [
    body('role')
      .isIn(['admin', 'manager', 'staff'])
      .withMessage('Role must be admin, manager, or staff')
  ],
  updateUserRole
);
router.get('/manager-operations', authenticateToken, managerAndAdmin, managerOperations);

// Admin only access
router.get('/users', authenticateToken, adminOnly, getAllUsers);
router.delete('/user/:userId', authenticateToken, adminOnly, deleteUser);
router.get('/admin-operations', authenticateToken, adminOnly, adminOperations);

export default router;
