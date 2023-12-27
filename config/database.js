const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const connectDB = async() =>{
    await mongoose.set('strictQuery',false);
    await mongoose
        .connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(()=>console.log('Database connected'))
        .catch((err)=>console.log('Connect failded'));
}
module.exports = connectDB;