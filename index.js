const express = require("express");
const app = express();
const PORT = 3000;
const {engine} = require("express-handlebars");
const path = require('path')
const connectDB = require('./config/database')
const route = require('./routes/index')
//static file
app.use(express.static('public'))
//view engine
app.engine("hbs",engine({
    extname : '.hbs'
}));
app.set('view engine','hbs');
app.set('views','./views');
//connect DB
connectDB();
app.use(express.json());
route(app);
app.listen(3000, ()=>{
    console.log(`http://localhost:${PORT}`)
});