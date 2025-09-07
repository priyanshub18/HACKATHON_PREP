import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import { connectToDatabase } from './config/db.js';
import indexRouter from './routes/index.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
import User from './models/UserModel.js';
dotenv.config();
// Creates an express for you 
const app = express();

// Core middleware
app.use(helmet());

// CORS (Cross-Origin Resource Sharing) - Allow frontend to communicate with backend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5172'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); 

// Convert your body to JSON 

// {
//   "name": "John Doe",
//   "email": "john@doe.com",
//   "password": "123456"
// }
// Convert the body to the json
app.use(express.json());


// Huffman coding -> Algorithm 


// it is used in order to compress the response body
// MBs very big 
app.use(compression());

// it is used to log the request and response
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Routes
app.use('/', indexRouter);

// 404 and error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

// Start server after DB connects
//WE will start the server after connecting 
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server listening on port ${PORT}`);
      console.log(`API server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });


// try{
//   await StartServer();
// }catch(err){
//   console.error('Failed to start server due to database connection:', err);
//   process.exit(1);
// }
// async function StartServer() {
//     const response = await connectToDatabase();
//     if(response.readyState === 1  && response.connection.readyState === 1) {
//       app.listen(PORT, () => {
//         console.log(`API server listening on port ${PORT}`);
//         console.log(`API server running on http://localhost:${PORT}`);
//       });
//     }
//     else {
//       console.log('Failed to start server');
//       process.exit(1);
//     }
// }
