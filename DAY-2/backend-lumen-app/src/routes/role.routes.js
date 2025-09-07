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
  deleteSupplier,
  createProduct,
  getAllProducts,
  editProduct,
  deleteProduct,  
  createUser,
  editUser,
  createStockMovement,
  getStockStats,
  getStats,
  getAllStockMovements

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


// Product CRUD
router.post('/product', authenticateToken , managerAndAdmin, createProduct);
router.get('/products', authenticateToken, managerAndAdmin, getAllProducts);
router.put('/product/:productId', authenticateToken, managerAndAdmin, editProduct);
router.delete('/product/:productId', authenticateToken, managerAndAdmin, deleteProduct);


// User routes
router.post('/user', authenticateToken, adminOnly, createUser);
router.put('/user/:userId', authenticateToken, adminOnly, editUser);
router.get('/users', authenticateToken, adminOnly, getAllUsers);
router.delete('/user/:userId', authenticateToken, adminOnly, deleteUser);



router.post('/stock-movement', authenticateToken, staffAndAbove, createStockMovement);
router.post('/all-stock-movements', authenticateToken, staffAndAbove, getAllStockMovements);
router.get('/stock-stats', authenticateToken, staffAndAbove, getStockStats);
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
router.post('/user', authenticateToken, adminOnly, createUser);
router.get('/users', authenticateToken, adminOnly, getAllUsers);
router.delete('/user/:userId', authenticateToken, adminOnly, deleteUser);
router.get('/stats' , authenticateToken, adminOnly, getStats);

export default router;
