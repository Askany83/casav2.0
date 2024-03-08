import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const mongodbURI = process.env.MONGODB_URI;
    if (!mongodbURI) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }
    await mongoose.connect(mongodbURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
