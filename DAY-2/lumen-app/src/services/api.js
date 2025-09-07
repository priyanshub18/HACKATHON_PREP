import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to change password' };
    }
  },
};

// User Management API endpoints
export const userAPI = {
  // Get all users (Admin only)
  getAllUsers: async () => {
    try {
      const response = await api.get('/api/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch users' };
    }
  },

  // Get all staff (Manager + Admin)
  getStaff: async () => {
    try {
      const response = await api.get('/api/staff');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch staff' };
    }
  },

  // Update user role (Manager + Admin)
  updateUserRole: async (userId, role) => {
    try {
      const response = await api.put(`/api/user/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user role' };
    }
  },

  // Delete user (Admin only)
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/api/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete user' };
    }
  },

  // Get my data (Staff)
  getMyData: async () => {
    try {
      const response = await api.get('/api/my-data');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch data' };
    }
  },
};

// Role-based operations API
export const operationsAPI = {
  // Staff operations
  getStaffOperations: async () => {
    try {
      const response = await api.get('/api/staff-operations');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch staff operations' };
    }
  },

  // Manager operations
  getManagerOperations: async () => {
    try {
      const response = await api.get('/api/manager-operations');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch manager operations' };
    }
  },

  // Admin operations
  getAdminOperations: async () => {
    try {
      const response = await api.get('/api/admin-operations');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch admin operations' };
    }
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Health check failed' };
    }
  },
};

export default api;
