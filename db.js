const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
const mongoDB = process.env.MONGO_DB;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            dbName:mongoDB
           //if we need to add mongo connection options this is where they would go
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
