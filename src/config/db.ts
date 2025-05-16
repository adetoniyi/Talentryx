import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error('MONGODB_URL is not defined in environment variables');
    }
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

export default connectDB;
