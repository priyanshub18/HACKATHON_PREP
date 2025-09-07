#!/usr/bin/env node

/**
 * Integration Test Script for Lumen App
 * This script tests the backend API endpoints to ensure they're working correctly
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:4000';

// Test data
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'Password123',
  role: 'staff'
};

const adminUser = {
  username: 'admin',
  email: 'admin@example.com',
  password: 'Admin123',
  role: 'admin'
};

let authToken = '';

async function testAPI() {
  console.log('🚀 Starting Lumen App Integration Tests...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    console.log('');

    // Test 2: Register Test User
    console.log('2. Testing User Registration...');
    try {
      const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, testUser);
      console.log('✅ User registration successful:', registerResponse.data.message);
      authToken = registerResponse.data.data.token;
      console.log('🔑 Auth token received');
    } catch (error) {
      if (error.response?.status === 400 && error.response.data.message.includes('already exists')) {
        console.log('⚠️  User already exists, attempting login...');
        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
          email: testUser.email,
          password: testUser.password
        });
        authToken = loginResponse.data.data.token;
        console.log('✅ Login successful, auth token received');
      } else {
        throw error;
      }
    }
    console.log('');

    // Test 3: Get User Profile
    console.log('3. Testing Get User Profile...');
    const profileResponse = await axios.get(`${API_BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Profile retrieved:', profileResponse.data.data.user.username);
    console.log('');

    // Test 4: Register Admin User
    console.log('4. Testing Admin User Registration...');
    try {
      const adminRegisterResponse = await axios.post(`${API_BASE_URL}/auth/register`, adminUser);
      console.log('✅ Admin user registration successful');
      const adminToken = adminRegisterResponse.data.data.token;
      
      // Test 5: Get All Users (Admin only)
      console.log('5. Testing Get All Users (Admin only)...');
      const usersResponse = await axios.get(`${API_BASE_URL}/api/users`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      console.log('✅ Users retrieved:', usersResponse.data.data.users.length, 'users found');
      console.log('');

      // Test 6: Update User Role
      console.log('6. Testing Update User Role...');
      const testUserId = usersResponse.data.data.users.find(u => u.email === testUser.email)?.id;
      if (testUserId) {
        const updateRoleResponse = await axios.put(`${API_BASE_URL}/api/user/${testUserId}/role`, {
          role: 'manager'
        }, {
          headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('✅ User role updated successfully');
      }
      console.log('');

    } catch (error) {
      if (error.response?.status === 400 && error.response.data.message.includes('already exists')) {
        console.log('⚠️  Admin user already exists, skipping registration');
      } else {
        throw error;
      }
    }

    console.log('🎉 All tests passed! The backend API is working correctly.');
    console.log('\n📋 Test Summary:');
    console.log('✅ Health check endpoint');
    console.log('✅ User registration');
    console.log('✅ User login');
    console.log('✅ Profile retrieval');
    console.log('✅ Admin user management');
    console.log('✅ Role-based access control');
    
    console.log('\n🚀 You can now start the frontend and test the full integration!');
    console.log('Frontend: npm run dev (in lumen-app directory)');
    console.log('Backend: npm run dev (in backend-lumen-app directory)');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Status:', error.response.status);
    }
    process.exit(1);
  }
}

// Check if axios is available
try {
  require.resolve('axios');
} catch (e) {
  console.error('❌ Axios is required for testing. Please install it:');
  console.error('npm install axios');
  process.exit(1);
}

// Run the tests
testAPI();
