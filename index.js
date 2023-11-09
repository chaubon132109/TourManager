const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = 3000||process.env.PORT;
const {engine} = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/database');
const route = require('./routes/v1/index');
dotenv.config();
//cookieParser
app.use(cookieParser());
//static file
app.use(express.static('public'))
//view engine
const hbs = engine({
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
});
app.engine('hbs', hbs);
app.set('view engine', 'hbs');
app.set('views', './app/views');
//connect DB
connectDB();
app.use(express.json());
route(app);
app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
});