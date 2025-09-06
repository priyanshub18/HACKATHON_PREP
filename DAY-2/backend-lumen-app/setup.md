# Setup Instructions

## Prerequisites
1. Node.js (v14 or higher)
2. MongoDB (local installation or MongoDB Atlas)

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
The `.env` file has been created with default values. You can modify it as needed:
```env
MONGODB_URI=mongodb://localhost:27017/lumen-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=4000
NODE_ENV=development
```

### 3. Start MongoDB
**Option A: Local MongoDB**
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or start manually
mongod
```

**Option B: MongoDB Atlas**
- Create a free account at https://www.mongodb.com/atlas
- Create a cluster and get your connection string
- Update the `MONGODB_URI` in your `.env` file

### 4. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### 5. Test the API
The server will be available at `http://localhost:4000`

Test the health endpoint:
```bash
curl http://localhost:4000/health
```

## Default User Roles

The system supports three roles:
- **Admin**: Full system access
- **Manager**: Can manage staff and view reports
- **Staff**: Basic user access

## API Testing

Use the provided API documentation (`API_DOCUMENTATION.md`) to test all endpoints. You can use:
- Postman
- Insomnia
- curl commands
- Thunder Client (VS Code extension)

## Sample Test Flow

1. **Register a new user:**
```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin_user",
    "email": "admin@example.com",
    "password": "AdminPass123",
    "role": "admin"
  }'
```

2. **Login:**
```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "AdminPass123"
  }'
```

3. **Use the returned token for protected routes:**
```bash
curl -X GET http://localhost:4000/auth/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the connection string in `.env`
- Verify MongoDB is accessible on the specified port

### JWT Token Issues
- Ensure the JWT_SECRET is set in `.env`
- Check token format: `Authorization: Bearer <token>`
- Verify token hasn't expired (7 days default)

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process using the port: `lsof -ti:4000 | xargs kill`
