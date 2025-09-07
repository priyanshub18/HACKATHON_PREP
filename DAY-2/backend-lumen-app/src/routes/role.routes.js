import express from 'express';
import {
  getAllUsers,
  deleteUser,
  getStaff,
  updateUserRole,
  getMyData,
  createSupplier,
  getAllSuppliers,
  editSupplier,
  deleteSupplier
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

// Supplier routes
router.post('/supplier', authenticateToken , managerAndAdmin, createSupplier);
router.get('/suppliers', authenticateToken, managerAndAdmin, getAllSuppliers);
router.put('/supplier/:supplierId', authenticateToken, managerAndAdmin, editSupplier);
router.delete('/supplier/:supplierId', authenticateToken, managerAndAdmin, deleteSupplier);


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

// Admin only access
router.get('/users', authenticateToken, adminOnly, getAllUsers);
router.delete('/user/:userId', authenticateToken, adminOnly, deleteUser);

export default router;
