import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URL;
  if (!uri) {
    console.log("Mongo connection error: MONGODB_URI is not found (also checked MONGODB_URL)");
    throw new Error("Missing MongoDB connection string. Set MONGODB_URI in .env.local");
  }
    if (isConnected) return console.log("MongoDB is already connected");
    try{
        await mongoose.connect(uri);

        isConnected = true;
        console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
    }catch(error){
    console.log("Mongo connection error:", error);
    
    }
}