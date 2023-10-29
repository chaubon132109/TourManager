
const userService =  require('./user.service');
const ErrorResponse = require('../middlewares/ErrorResponse');
const User = require('../app/models/user');
let loginUser = async(email,password)=>{
    const user = await userService.getUserByEmail(email);
    if(!user || !(await user.checkPasswordMatch(password))){
        throw new ErrorResponse('Login failed !! Email or password is incorrect',400);  
    }
    return user;
};
let forgotPassword = async(email)=>{
    const user = await User.findOne({email});
    if(!user){
        throw new ErrorResponse('Email is incorrect!!',400);
    }else{
        return user;
    }
};
//reset password with passwordResetToken
let resetPassword = async(hashToken,req)=>{
    const user = await User.findOne({
        passwordResetToken : hashToken,
        passwordResetExpires : {$gt: Date.now()}
    });
    if(!user){
        throw new ErrorResponse('Token is invalid or has expired', 400);
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return user;
};
//Create option for send mail
let mailLogin = async(req,user)=>{
    const url = `${req.protocol}://${req.get('host')}/me`;
    const options = {
        email: user.email,
        subject: 'Welcome to the Tour Manager Family!',
        template : 'welcome',
        context : {
            username : user.name,
            url
        }
    };
    return options;
};
let signCookie = async(req,res,token,user)=>{
    res.cookie('jwt',token,{
        expires : new Date(
            Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnLy : true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    })
};
let loggedout = async(req,res)=>{
    res.cookie('jwt','loggedout',{
        expires : new Date(Date.now()+2*1000),
        httpOnLy : true
    });
};
let mailForgotPassword = async(req,user,resetToken)=>{
    const url = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;
    const options = {
        email: user.email,
        subject: 'Your password reset token (valid for 10 minutes)',
        template : 'forgetPassword',
        context : {
            username : user.name,
            url
        }
    };
    return options;
}
module.exports = {loginUser,forgotPassword,signCookie,mailLogin,resetPassword,mailForgotPassword,loggedout};