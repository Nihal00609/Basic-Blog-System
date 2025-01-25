export * from "./mysql.js";
export * from "./models/User.js";
export * from "./models/Post.js";

import mongoose from 'mongoose';  

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${mongoose.connection.host}`);
        
    } catch (error) {
        console.error(`MongoDB server Issuse: ${error.message}`);
        
    }
}
