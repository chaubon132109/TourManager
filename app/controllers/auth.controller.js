const authService = require('../../services/auth.service');
const userService = require('../../services/user.service');
const emailService = require('../../services/email.service');
const asyncHandler = require('../../middlewares/asyncHandle');
const crypto = require('crypto');
let login = asyncHandler(async (req,res,next)=>{
    const userLogin = await authService.loginUser(req.body.email,req.body.password);
    const accessToken = userLogin.signToken();
    authService.signCookie(req,res,accessToken,userLogin);
    res.status(200).json({
        status : 'success',
        token: accessToken,
        message : userLogin
    });

})
let register = asyncHandler(async(req,res,next)=>{
    const user = await userService.createUser(req.body);
    const accessToken = user.signToken();
    const options = await authService.mailLogin(req,user);
    await emailService.sendMail(options);
    res.status(201).json({
        status: 'success',
        token: accessToken,
        data: {
            user
        }
    });
});
let logout = async(req,res,next)=>{
    const loggedout = await authService.loggedout(req,res);
    res.status(200).json({
        status : 'succes',
        message : 'The account is logged out!'
    })
};
let forgetPassword = asyncHandler(async(req,res,next)=>{
    const user = await authService.forgotPassword(req.body.email);
    const tokenResetPassword = user.createPasswordResetToken();
    user.save({ validateBeforeSave: false });
    const options = await authService.mailForgotPassword(req,user,tokenResetPassword);
    await emailService.sendMail(options);
    res.status(200).json({
        status : 'succes',
        message : 'The token is send to email!',
        user : user,
        option : options
    })
});
let resetPassword = asyncHandler(async(req,res,next)=>{
    const hashToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    const user = await authService.resetPassword(hashToken,req);
    const accessToken  = user.signToken();
    res.status(200).json({
        status : 'success',
        token : accessToken
    })
});
module.exports = {login,register,logout,forgetPassword,resetPassword};