const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const connectDB = async () => {
    try {
      await mongoose.connect(
        "mongodb://localhost:27017/travel_test",
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