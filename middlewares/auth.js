const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const ErrorRespone = require('./ErrorResponse');
const User = require('../app/models/user');

let protect = async(req, res, next) =>{
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if(req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if(!token){
        return next(new ErrorRespone('You are not logged in! Please log in to get access.', 401));
    }
    const decode = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    const currentUser = await User.findById(decode.id);
    if(!currentUser){
        return next(new ErrorRespone('The user belonging to this token does no longer exist.', 401));
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
};
let retrictTo = (...roles) =>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorRespone('You do not have permission to perform this action',403)
            );
        }
        next();
    };
};
let isLogged = async(req, res, next)=>{
    if(!req.cookies.jwt) {
        return next(); 
    }
    if(req.cookies.jwt){
        try {
            const decode = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
            const currentUser = await User.findById(decode.id);
            if(!currentUser){
                return next();
            }
            if(currentUser.passwordChangedAt(decode.iat)){
                return next();
            }
            req.locals.user = currentUser;
            return next();
        } catch (error) {
            return next;
        }
    }
}
module.exports = {protect, retrictTo, isLogged}