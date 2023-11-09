const getTour = require('./tourRoute');
const getUser = require('./userRoute');
const authRouter = require('./authRoute');
const viewRoute = require('./viewRouter');
function route(app){
    app.use('/api/v1/auth',authRouter);     
    app.use('/api/v1/user',getUser);
    app.use('/api/v1/tour',getTour);
    app.use('/',viewRoute);
}
module.exports = route;