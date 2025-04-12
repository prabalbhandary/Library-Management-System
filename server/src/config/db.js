import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB, {
      dbName: process.env.DB_NAME,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`MongoDB connection error: ${error.message}`.bgRed.white);
    process.exit(1);
  }
};

export default connectDB;
