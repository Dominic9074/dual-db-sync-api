import mongoose from "mongoose";
import "dotenv/config";

export const connectMongoDB=async ():Promise<void>=>{
    try{
        await mongoose.connect(process.env.Mongo_URI!)
        console.log("MongoDB connected successfully")
    }catch(error){
        console.log('MongoDB connection Failed',error);
        throw error
    }
}

