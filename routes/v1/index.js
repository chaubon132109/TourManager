const getTour = require('./tourRoute');
const getUser = require('./userRoute')
function route(app){
    app.use('/api/v1/user',getUser);
    app.use('/api/v1/tour',getTour);
    app.use('/',(req,res)=>{
        res.send('Hello world!');
    })
}
module.exports = route;