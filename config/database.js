const mongoose = require('mongoose');
const connectDB = async() =>{
    await mongoose.set('strictQuery',false);
    await mongoose
        .connect('mongodb://localhost:27017/travel_test',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(()=>console.log('Database connected'))
        .catch((err)=>console.log('Database failed'));
}
module.exports = connectDB;