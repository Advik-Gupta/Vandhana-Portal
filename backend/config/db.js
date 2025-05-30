import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://tejsvapandey2023:<Database_password>@cluster0.0gtw6gr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
