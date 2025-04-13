import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('There is no MONGODB_URI in envs.');
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Success connect to MongoDB');
  } catch (error) {
    console.error('❌ Error connect to MongoDB:', error);
    process.exit(1);
  }
};
