# Lumen App Backend API Documentation

## Overview
This is a Node.js backend application with Express.js, MongoDB, JWT authentication, and role-based access control. The system supports three user roles: Admin, Manager, and Staff.

## Features
- User registration and login with JWT authentication
- Password hashing using bcrypt
- Role-based access control (Admin, Manager, Staff)
- Input validation using express-validator
- Secure API endpoints with proper error handling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/lumen-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=4000
NODE_ENV=development
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication Routes (`/auth`)

#### 1. Register User
- **POST** `/auth/register`
- **Description**: Register a new user
- **Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "staff" // optional: admin, manager, staff (default: staff)
}
```
- **Response**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "staff",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### 2. Login User
- **POST** `/auth/login`
- **Description**: Login with email and password
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "staff",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### 3. Get Profile
- **GET** `/auth/profile`
- **Description**: Get current user's profile
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "staff",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### 4. Update Profile
- **PUT** `/auth/profile`
- **Description**: Update current user's profile
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "username": "new_username",
  "email": "newemail@example.com"
}
```

#### 5. Change Password
- **PUT** `/auth/change-password`
- **Description**: Change current user's password
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```

### Role-Based API Routes (`/api`)

#### Staff Level Access
- **GET** `/api/my-data` - Get own data
- **GET** `/api/staff-operations` - Access staff operations

#### Manager Level Access (Manager + Admin)
- **GET** `/api/staff` - Get all staff members
- **PUT** `/api/user/:userId/role` - Update user role
- **GET** `/api/manager-operations` - Access manager operations

#### Admin Level Access
- **GET** `/api/users` - Get all users
- **DELETE** `/api/user/:userId` - Delete user
- **GET** `/api/admin-operations` - Access admin operations

## User Roles and Permissions

### Staff
- View own profile
- Update own profile
- Change own password
- Access basic operations

### Manager
- All Staff permissions
- View all staff members
- Update user roles
- Access management operations

### Admin
- All Manager permissions
- View all users
- Delete users
- Full system access

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // validation errors if applicable
}
```

## Validation Rules

### Registration
- Username: 3-50 characters, alphanumeric and underscores only
- Email: Valid email format
- Password: Minimum 6 characters, must contain uppercase, lowercase, and number
- Role: Must be 'admin', 'manager', or 'staff'

### Login
- Email: Valid email format
- Password: Required

## Example Usage

### 1. Register a new user
```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "Password123",
    "role": "staff"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### 3. Access protected route
```bash
curl -X GET http://localhost:4000/auth/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```

### 4. Admin operations
```bash
curl -X GET http://localhost:4000/api/users \
  -H "Authorization: Bearer <admin_jwt_token>"
```

## Security Features

1. **Password Hashing**: Uses bcrypt with 12 salt rounds
2. **JWT Tokens**: Secure token-based authentication
3. **Input Validation**: Comprehensive validation using express-validator
4. **Role-based Access**: Granular permission system
5. **Error Handling**: Secure error responses without sensitive data exposure

## Database Schema

### User Model
```javascript
{
  username: String (required, unique)
  email: String (required, unique)
  password: String (required, hashed)
  role: String (required, enum: ['admin', 'manager', 'staff'])
  createdAt: Date
  updatedAt: Date
}
```

## Testing the API

You can test the API using tools like:
- Postman
- Insomnia
- curl (command line)
- Thunder Client (VS Code extension)

Make sure to:
1. Start MongoDB
2. Set up the `.env` file
3. Install dependencies with `npm install`
4. Start the server with `npm run dev`
