require('dotenv').config();
import mongoose from 'mongoose';
import app from './app';
import connectDB from './config/db';  
// import { setupSwagger } from './docs/swagger'; // Import swagger setup

// setupSwagger(app); // Setup swagger documentation


// Removed duplicate mongoose import
const mongoURL = process.env.MONGODB_URL;
if (!mongoURL) {
  throw new Error('MONGODB_URL is not defined in environment variables');
}
// Connect to MongoDB

mongoose.connect(mongoURL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err: unknown) => console.log("MongoDB connection failed", err));


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});