# Lumen App - Full Stack Integration

This document provides comprehensive instructions for running the integrated Lumen application with both frontend and backend components.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend-lumen-app

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB connection string and JWT secret

# Start MongoDB (if using local installation)
# macOS with Homebrew:
brew services start mongodb-community

# Start the backend server
npm run dev
```

The backend will be available at `http://localhost:4000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd lumen-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend-lumen-app` directory:

```env
MONGODB_URI=mongodb://localhost:27017/lumen-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=4000
NODE_ENV=development
```

### Frontend API Configuration

The frontend is configured to connect to the backend at `http://localhost:4000`. This is set in `src/services/api.js`.

## 🏗️ Architecture Overview

### Backend (Node.js + Express + MongoDB)
- **Authentication**: JWT-based with role-based access control
- **Database**: MongoDB with Mongoose ODM
- **Security**: Password hashing with bcrypt, CORS enabled
- **API Endpoints**: RESTful API with comprehensive error handling

### Frontend (React + Vite + Tailwind CSS)
- **State Management**: React Context for authentication
- **Routing**: React Router with protected routes
- **UI Components**: Modern, responsive design with Tailwind CSS
- **API Integration**: Axios for HTTP requests with interceptors

## 🔐 Authentication & Authorization

### User Roles
- **Admin**: Full system access, can manage all users
- **Manager**: Can manage staff and view reports
- **Staff**: Basic user access with limited permissions

### Protected Routes
- Admin routes: `/admin/*` (Admin only)
- Manager routes: `/manager/*` (Manager + Admin)
- Staff routes: `/staff/*` (Staff + Manager + Admin)

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile
- `PUT /auth/change-password` - Change password

### User Management (Admin only)
- `GET /api/users` - Get all users
- `DELETE /api/user/:userId` - Delete user
- `PUT /api/user/:userId/role` - Update user role

### Role-based Operations
- `GET /api/staff-operations` - Staff operations
- `GET /api/manager-operations` - Manager operations
- `GET /api/admin-operations` - Admin operations

## 🧪 Testing the Integration

### 1. Test User Registration
1. Navigate to `http://localhost:5173/login`
2. Switch to "Sign Up" tab
3. Fill in the form with:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - Role: `staff`
4. Click "Sign Up"
5. You should be redirected to the staff dashboard

### 2. Test User Login
1. Navigate to `http://localhost:5173/login`
2. Use the credentials from registration
3. Click "Login"
4. You should be redirected to the appropriate dashboard based on role

### 3. Test Admin User Management
1. Register an admin user or update an existing user's role to admin
2. Navigate to `/admin/users`
3. Test creating, editing, and deleting users

### 4. Test Protected Routes
1. Try accessing `/admin` without being logged in - should redirect to login
2. Try accessing `/admin` as a staff user - should redirect to staff dashboard
3. Test role-based access control

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues
1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env`
   - Verify MongoDB is accessible on the specified port

2. **CORS Errors**
   - Check that the frontend URL is included in CORS origins
   - Verify the frontend is running on the expected port

3. **JWT Token Issues**
   - Ensure JWT_SECRET is set in `.env`
   - Check token format in Authorization header
   - Verify token hasn't expired

#### Frontend Issues
1. **API Connection Errors**
   - Verify backend is running on port 4000
   - Check network tab in browser dev tools
   - Ensure CORS is properly configured

2. **Authentication Issues**
   - Clear localStorage and try again
   - Check if token is being stored correctly
   - Verify user role permissions

3. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check for TypeScript/ESLint errors
   - Verify all imports are correct

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in the backend `.env` file.

## 📁 Project Structure

```
DAY-2/
├── backend-lumen-app/          # Backend API
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Custom middleware
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   └── server.js         # Main server file
│   ├── package.json
│   └── .env
├── lumen-app/                 # Frontend React app
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── contexts/         # React contexts
│   │   ├── services/         # API services
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── INTEGRATION_README.md      # This file
```

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment variables
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Set a strong JWT_SECRET
4. Deploy to platforms like Heroku, Railway, or AWS

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3
3. Update API base URL in production

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **JWT Secret**: Use a strong, random secret in production
3. **Password Hashing**: Passwords are hashed with bcrypt
4. **CORS**: Configure CORS properly for production
5. **Input Validation**: All inputs are validated on the backend
6. **Error Handling**: Sensitive information is not exposed in error messages

## 📞 Support

If you encounter any issues:
1. Check the console logs in both frontend and backend
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that both servers are running on the correct ports

## 🎯 Next Steps

1. Add more comprehensive error handling
2. Implement real-time notifications
3. Add data validation on the frontend
4. Implement file upload functionality
5. Add comprehensive testing suite
6. Implement caching strategies
7. Add monitoring and logging

---

**Happy Coding! 🚀**
