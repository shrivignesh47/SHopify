import { connect } from 'mongoose';
import { config } from 'dotenv';

// Load environment variables
config();

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,  // To ensure compatibility with MongoDB index creation
            useFindAndModify: false // To avoid deprecation warnings
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

// Export the connection function
export default connectDB;
