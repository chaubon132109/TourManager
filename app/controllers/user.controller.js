const User = require('../models/user');
const asyncHandle = require('../../middlewares/asyncHandle');
const APIFeatures = require('../../middlewares/APIFeatures');
const ErrorResponse = require('../../middlewares/ErrorResponse');
const userService = require('../../services/user.service');
const user = require('../models/user');
let getAllUsers = asyncHandle(async(req,res,next)=>{
    const features = new APIFeatures(User.find(),req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
    const users = await features.query;
    res.status(200).json({
        status : 'succes',
        total: users.length,
        data: {
            users
        }
    });
});
let getUser = asyncHandle(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorResponse('Unable to find user with that ID',404));
    }
    res.status(200).json({
        status : 'succes',
        data: {
            user
        }
    });
});
let createUser = asyncHandle(async(req,res,next)=>{
    const newUser = await User.create(req.body);
    res.status(200).json({
        status : 'succes',
        data: {
            newUser
        }
    });
});
let deleteUser = asyncHandle(async(req,res,next)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        return next(new ErrorResponse('Unable to delete user with that ID',404));
    }
    res.status(200).json({
        status : 'succes',
        data: {
            user
        }
    });
});
let updateUser = asyncHandle(async(req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.params.id);
    if(!user){
        return next(new ErrorResponse('Unable to find user with that ID',404));
    }
    res.status(200).json({
        status : 'succes',
        data: {
            user
        }
    });
});
//after logged in
let getMe = asyncHandle(async(req,res,next)=>{
    req.params.id = req.user.id;
    next();
}); 
let updateMe = asyncHandle(async(req,res,next)=>{
    //update name, email, avatar
    const filterObj = userService.filterObject(req.body,'name','email');
    const updatedMe = await User.findByIdAndUpdate(req.body);
    if(req.file) filterObj.avatar = req.file.filename;
    const updatedUser = await userService.updateMe(req,filterObj);
    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        }
    });
});
let deleteMe = asyncHandle(async(req,res,next)=>{
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
        status: 'success',
        data: null
    });
});
let updateMyPassword = asyncHandle(async(req,res,next)=>{
    const {passwordCurrent, password, passwordConfirm} = req.body;
    const user = userService.updatePassword(passwordCurrent,password,passwordConfirm,req);
    res.status(200).json({
        status : "success",
        data: {
            user
        }
    });
});
module.exports = {getAllUsers,getUser,createUser,deleteUser,updateUser, getMe,updateMe,deleteMe,updateMyPassword};