// Role-based controller to demonstrate different access levels
import Supplier from '../models/SupplierModel.js';
import Product from '../models/ProductModel.js';
import User from '../models/UserModel.js';
// import StockMovement from '../models/StockMovementModel.js'; // Commented out - model not found
import Logs from '../models/LogsModel.js';
import bcrypt from 'bcryptjs';



export const createUser = async (req, res) => {
  try{
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword , role });
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const editUser = async (req, res) => {
  try{
    const { userId } = req.params;
    const { username, email, password, role } = req.body;
    const hashedNewPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(userId, { username, email, password: hashedNewPassword, role }, { new: true });
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: { user }
    });
  }
  catch (error) {
    console.error('Edit user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
} 
// Admin only - can manage all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    const usersArray = [];
    for(let user of users){
      usersArray.push({
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'All users retrieved successfully',
      data: { usersArray }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Admin only - can delete users
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Manager and Admin - can view staff
export const getStaff = async (req, res) => {
  try {
    const User = (await import('../models/UserModel.js')).default;
    const staff = await User.find({ role: 'staff' }).select('-password');
    
    res.status(200).json({
      success: true,
      message: 'Staff members retrieved successfully',
      data: { staff }
    });
  } catch (error) {
    console.error('Get staff error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Manager and Admin - can update user roles
export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    
    if (!['admin', 'manager', 'staff'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be admin, manager, or staff'
      });
    }

    const User = (await import('../models/UserModel.js')).default;
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// All authenticated users - can view their own data
export const getMyData = async (req, res) => {
  try {
    const User = (await import('../models/UserModel.js')).default;
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User data retrieved successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Get my data error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getStats = async (req , res) => {
  try{
    let totalUsers = await User.countDocuments();
    let totalProducts = await Product.countDocuments();
    let activeSuppliers = await Supplier.countDocuments({ status: 'active' });
    
    // Fix: Use filter approach to find products with stock below their minStock
    let products = await Product.find({});
    let lowStockItems = products.filter(product => product.stock < product.minStock).length;

    res.status(200).json({
      success: true,
      message: 'Stats retrieved successfully',
      data: { totalUsers, totalProducts, activeSuppliers, lowStockItems }
    });
  }
  catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    }); 
  }
}


// CRUD operations on the suppliers
export const createSupplier = async ( req , res) => {
  try{
    const { name, contact, email, phone, address, city, country, status } = req.body;
    const supplier = await Supplier.create({ name, contact, email, phone, address, city, country, status });
    res.status(201).json({
      success: true,
      message: 'Supplier created successfully',
      data: { supplier }
    });
  } catch (error) {
    console.error('Create supplier error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  } 
  
}


export const getAllSuppliers = async ( req , res) => {
  try{
    const suppliers = await Supplier.find();
    res.status(200).json({
      success: true,
      message: 'All suppliers retrieved successfully',
      data: { suppliers }
    });
  }
  catch (error) {
    console.error('Get all suppliers error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const editSupplier = async ( req , res) => {
  try{
    const { supplierId } = req.params;
    const { name, contact, email, phone, address, city, country, status } = req.body;
    const supplier = await Supplier.findByIdAndUpdate(supplierId, { name, contact, email, phone, address, city, country, status }, { new: true });
    res.status(200).json({
      success: true,
      message: 'Supplier updated successfully',
      data: { supplier }
    });
  } catch (error) {
    console.error('Edit supplier error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }   
  
}

export const deleteSupplier = async ( req , res) => {
  try{
    const { supplierId } = req.params;
    const supplier = await Supplier.findByIdAndDelete(supplierId);
    res.status(200).json({
      success: true,
      message: 'Supplier deleted successfully',
      data: { supplier }
    });
  }
  catch (error) {
    console.error('Delete supplier error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}


export const createProduct = async ( req , res) => {
  try{
    const { name, description, price, quantity, supplierId  , category , sku , stock , minStock , maxStock  , cost } = req.body;
    const product = await Product.create({ name, description, price, quantity, supplierId , category , sku , stock , minStock , maxStock , cost });
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });
  }
  catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const getAllProducts = async ( req , res) => {
  try{
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: 'All products retrieved successfully',
      data: { products }
    });
  }
  catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const editProduct = async ( req , res) => {
  try{
    const { productId } = req.params;
    const { name, description, price, quantity, supplierId , category , sku , stock , minStock , maxStock  , cost } = req.body;
    const product = await Product.findByIdAndUpdate(productId, { name, description, price, quantity, supplierId , category , sku , stock , minStock , maxStock , cost    }, { new: true });
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });
  }
  catch (error) {
    console.error('Edit product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const deleteProduct = async ( req , res) => {
  try{
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: { product }
    });
  }
  catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const createStockMovement = async ( req , res) => {
  try{
    const { productId, movementType, quantity, reason, notes } = req.body;
    if(movementType.toLowerCase() == 'stock in') {
      movementType = 'in';
    } else if(movementType.toLowerCase() == 'stock out') {
      movementType = 'out';
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid movement type'
      });
    } 

    const product = await Product.findById(productId);
    if(!product) {
      return res.status(400).json({
        success: false,
        message: 'Product not found'
      });
    }

    if(movementType == 'in') {

        product.stock += quantity;
        await product.save();
     
    }
    else if(movementType == 'out') {
      if(product.stock - quantity < 0) {
        return res.status(400).json({
          success: false,
          message: 'Stock cannot be less than 0'
        });
      }
      else{
        product.stock  -= quantity;
        await product.save(); 
      }
    }
    else {
      return res.status(400).json({
        success: false,
        message: 'Invalid movement type'
      });
    }

    

    // const stockMovement = await StockMovement.create({ productId, movementType, quantity, reason, notes }); // Commented out - model not found
    const stockMovement = { productId, movementType, quantity, reason, notes }; // Mock response
    const logs = await Logs.create({ productId, movementType, quantity, reason, notes });
    res.status(201).json({
      success: true,
      message: 'Stock movement created successfully',
      data: { stockMovement }
    });
  }
  catch (error) {
    console.error('Create stock movement error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const getAllStockMovements = async (req , res ) =>{
  try{
    let stockMovements = await Product.find();
    let stockMovementsArray = [];
    for(let product of stockMovements){
      product_name = product.name;
      product_sku = product.sku;
      product_stock = product.stock;
      product_minStock = product.minStock;
      product_maxStock = product.maxStock;
      product_supplier = product.supplierId;
      product_category = product.category;
      product_price = product.price;
      product_cost = product.cost;
      last_updated = product.updatedAt;
      status = product.stock < product.minStock ? 'Low Stock' : product.stock > product.maxStock ? 'OverStock' : 'In Stock';
      product_movements = await Logs.find({ productId: product._id });
      stockMovementsArray.push({
        product_name,
        product_sku,
        product_stock,
        product_minStock,
        product_maxStock,
        product_supplier,
        product_category,
        product_price,
        product_cost,
        product_movements,
        last_updated,
        status
      });
    }
    res.status(200).json({
      success: true,
      message: 'All stock movements retrieved successfully',
      data: { stockMovementsArray }
    });
  }
  catch (error) {
    console.error('Get all stock movements error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
export const getStockStats = async (req , res ) =>{
  try{
    let totalItems = await Product.countDocuments();
    // those who are less that their minimum stocks 
    //use filter function please
    let products = await Product.find({});
    let lowStockItems = products.filter(product => product.stock < product.minStock).length;  
    let outOfStockItems = products.filter(product => product.stock == 0).length;
    let overStockItems = products.filter(product => product.stock > product.maxStock).length;
    res.status(200).json({
      success: true,
      message: 'Stock stats retrieved successfully',
      data: { totalItems, lowStockItems, outOfStockItems, overStockItems }
    });
  }
  catch (error) {
    console.error('Get stock stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
