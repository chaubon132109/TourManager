const getTour = require('./tourRoute');
const getUser = require('./userRoute')
function route(app){
    app.use('/user',getUser);
    app.use('/tour',getTour);
    app.use('/',(req,res)=>{
        res.send('Hello world!');
    })
}
module.exports = route;