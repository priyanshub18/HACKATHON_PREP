// Role-based controller to demonstrate different access levels
import Supplier from '../models/SupplierModel.js';
// Admin only - can manage all users
export const getAllUsers = async (req, res) => {
  try {
    const User = (await import('../models/UserModel.js')).default;
    const users = await User.find({}).select('-password');
    
    res.status(200).json({
      success: true,
      message: 'All users retrieved successfully',
      data: { users }
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
    const User = (await import('../models/UserModel.js')).default;
    
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

// Admin only - admin operations
export const adminOperations = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin operations accessed successfully',
    data: {
      operations: [
        'Manage all users',
        'Delete users',
        'System configuration',
        'Full system access'
      ]
    }
  });
};



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