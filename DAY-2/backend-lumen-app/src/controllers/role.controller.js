// Role-based controller to demonstrate different access levels

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

// Staff only - basic operations
export const staffOperations = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Staff operations accessed successfully',
    data: {
      operations: [
        'View own profile',
        'Update own profile',
        'Change password',
        'View basic data'
      ]
    }
  });
};

// Manager only - management operations
export const managerOperations = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Manager operations accessed successfully',
    data: {
      operations: [
        'View all staff',
        'Update user roles',
        'Manage team data',
        'View reports'
      ]
    }
  });
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
