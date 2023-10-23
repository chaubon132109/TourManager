const User = require('../models/user');
const asyncHandle = require('../../middlewares/asyncHandle');
const APIFeatures = require('../../middlewares/APIFeatures');
const ErrorResponse = require('../../middlewares/ErrorResponse');
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
module.exports = {getAllUsers,getUser,createUser,deleteUser,updateUser};