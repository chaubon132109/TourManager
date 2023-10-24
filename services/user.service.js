const ErrorResponse = require('../middlewares/ErrorResponse');
const User = require('../app/models/user');

//create new user
let createUser = async(newUser) =>{
    return await User.create(newUser);
}
//get user by email
let getUserByEmail = async(email)=>{
    return await User.findOne({email}).select('+password');//select: false
}
//filter obj
let filterOject = (obj, ...allowField)=>{
    newObj = {};
    Object.keys(obj).map((el)=>{
        if(allowField.includes(el)){
            newObj[el] = obj[el];
        }
    });
    return newObj;
}

module.exports = {createUser,getUserByEmail}
