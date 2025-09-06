import mongoose from 'mongoose';

export async function connectToDatabase() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lumen_app';
  const dbName = process.env.MONGODB_DB || undefined;

  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUri, {
    dbName,
    autoIndex: process.env.NODE_ENV !== 'production',
  });

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });

  return mongoose.connection;
}


