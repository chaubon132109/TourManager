const ErrorResponse = require('../middlewares/ErrorResponse');
const User = require('../app/models/user');


//create new user
const createUser = async(newUser) =>{
    return await User.create(newUser);
}
//get user by email
let getUserByEmail = async(email)=>{
    return await User.findOne({email}).select('+password');//select: false
}
//filter obj
const filterObject = (obj, ...allowField)=>{
    newObj = {};
    Object.keys(obj).map((el)=>{
        if(allowField.includes(el)){
            newObj[el] = obj[el];
        }
    });
    return newObj;
}
//update me
const updateMe = async(req,filterObj)=>{
    //check update password => error
    if(req.body.password || req.body.passwordConfirm){
        throw new ErrorResponse('Please use /update-my-password to update your password!!',400);
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.id,filterObj,{
        new:true,
        runValidators : true
    }).select('-__v');
    return updatedUser;
}
//update password
const updatePassword = async(passwordCurrent,passwordNew,passwordNewConfirm,req)=>{
    const user = await User.findById(req.user.id).select('+password');
    if(!(await user.checkPasswordMatch(passwordCurrent))){
        throw new ErrorResponse('Your password current is wrong',400);
    }
    user.password = passwordNew;
    user.passwordConfirm = passwordNewConfirm;
    await user.save();
    return user;
}
module.exports = {createUser,getUserByEmail,filterObject,updateMe,updatePassword}
