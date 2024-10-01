import mongoose from 'mongoose'

const mongoURI = process.env.MONGO_URI;

const connectToDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to DB');
    } catch (error) {
        console.log('MongoDB connection failed', error.message);
        process.exit(1);
    }
}

export default connectToDB;