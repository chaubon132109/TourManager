const User = require('../models/user');
let getAllUser = async(req,res,next)=>{
    var users = await User.find({});
    res.status(200).json({
        status : 'succes',
        total: users.length,
        data: {
            users
        }
    });
};
module.exports = {getAllUser};