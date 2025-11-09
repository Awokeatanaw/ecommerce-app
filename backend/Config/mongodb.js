
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log('MongoDB URL:', process.env.MONGODB_URL); // Log the connection string
        await mongoose.connect(process.env.MONGODB_URL);
        
        mongoose.connection.on('connected', () => {
            console.log('DB connected');
        });

        mongoose.connection.on('error', (err) => {
            console.error('DB connection error:', err);
        });
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;
