const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const connectDB = async () => {
    try {
      await mongoose.connect(
        process.env.MONGODB_URL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      console.log('Database connected');
    } catch (err) {
      console.error(err);
    }
  };
  
  module.exports = connectDB;