import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    // Allow populate on paths that may be added gradually without crashing
    // This prevents errors like: "Cannot populate path X because it is not in your schema"
    // when hot reloads are out of sync.
    // You should still keep your schema and populate calls aligned.
    // @ts-ignore
    mongoose.set('strictPopulate', false);
   const uri = process.env.MONGODB_URI || process.env.MONGODB_URL;
   if (!uri) {
     throw new Error("Missing MongoDB connection string. Set MONGODB_URI or MONGODB_URL");
   }
   if (isConnected) {
     return;
   }
   try {
     await mongoose.connect(uri);
     isConnected = true;
     console.log("Connected to MongoDB");
   } catch (error) {
     console.log("Mongo connection error:", error);
     throw error;
   }
}