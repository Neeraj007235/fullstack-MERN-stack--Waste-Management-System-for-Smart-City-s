import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Connect MongoDB without deprecated options
    const conn = await mongoose.connect(process.env.MongoDBURI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error: ", error);
  }
};
