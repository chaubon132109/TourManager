const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const connectDB = async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://dbUser:chaubon1321@tour.etqmytu.mongodb.net/travel_test",
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