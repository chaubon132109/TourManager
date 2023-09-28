const express = require("express");
const app = express();
const PORT = 3000;
const {engine} = require("express-handlebars");
app.engine("hbs",engine({
    extname : '.hbs'
}));
app.set('view engine','hbs');
app.set('views','./views');
app.get("/",(req,res)=>{
    res.render('home.hbs')
});
app.listen(3000, ()=>{
    console.log(`http://localhost:${PORT}`)
});