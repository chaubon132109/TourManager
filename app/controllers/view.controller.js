const Tour = require('../models/tour');
const User = require('../models/user');
const Review = require('../models/review');
const Booking = require('../models/booking');
const asyncHandle = require('../../middlewares/asyncHandle');
const ErrorResponse = require('../../middlewares/ErrorResponse');
const crypto = require('crypto');
const auth = require('../../services/auth.service');

let getHomePage = asyncHandle(async(req, res, next)=>{
    const tours = await Tour.find().limit(3).sort('price');
    res.status(200).render('home.hbs',{
        title : 'Homepage',
        tours
    });
});
let getLoginPage = (req,res,next)=>{
    res.render('login.hbs',{
        layout: false,
        title : 'Login',
    });
}
let getRegPage = (req,res,next)=>{
    res.render('register.hbs',{
        title : 'Register',
    });
}
let logout = async(req,res,next)=>{
    const logged = await auth.loggedout(req,res); 
    res.redirect('/');
}
let getTourBySlug = asyncHandle(async(req, res, next)=>{
    const tour = await Tour.findOne({slug: req.params.slug});
    const review3 = await Review.find({tour: tour._id}).limit(3);
    const review = await Review.find({tour: tour._id});
    res.render("getATour.hbs",{
        title : tour.name,
        tour,
        review,
        review3
    });
});
let getAllTours = asyncHandle(async(req, res, next)=>{
    const tours = await Tour.find();
    res.render("allTours.hbs",{
        title : 'All Tour',
        tours
    });
});
let getMyTour = asyncHandle(async(req,res,next)=>{
    if(req.user){
        const booking = await Booking.find({user: req.user._id});
        const tourIds = booking.map((e) => e.tour);
        const tours = await Tour.find({ _id: { $in: tourIds } });
        res.render('myTour.hbs',{
            title : 'My Tour',
            tours
        })
    }
})
let getMyInfo = asyncHandle(async(req,res,next)=>{
    if(req.user){
        const user = await User.findById(req.user._id);
        res.status(200).json({
            title : 'Me',
            user
        })
    }
})
let forgetPassword = asyncHandle(async(req,res,next)=>{
    res.render('forgetpassword.hbs',{
        layout: false,
        title : 'forgetPassword',
    });
})
let resetPassword = asyncHandle(async(req,res,next)=>{
    const hashToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    const user = await User.findOne({
        passwordResetToken : hashToken,
        passwordResetExpires : {$gt: Date.now()}
    });
    if(!user){
        throw new ErrorResponse('Token is invalid or has expired', 400);
    }
    res.render('resetpassword.hbs',{
        layout: false,
        title : 'Reset Password',
    });
})
module.exports = {getHomePage,getLoginPage,logout,getRegPage,getTourBySlug,getMyTour,getAllTours,getMyInfo,forgetPassword,resetPassword};