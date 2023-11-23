const Tour = require('../models/tour');
const Review = require('../models/review');
const Booking = require('../models/booking');
const asyncHandle = require('../../middlewares/asyncHandle');
const ErrorRespone = require('../../middlewares/ErrorResponse');
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
let getAllTour = asyncHandle(async(req, res, next)=>{
    const tour = await Tour.find();
    res.render("allTour.hbs",{
        title : tour.name,
        tour
    });
});
let getMyTour = asyncHandle(async(req,res,next)=>{
    if(req.user){
        const booking = await Booking.find({user: req.user._id});
        res.status(200).json({
            booking
        })
    }
})
module.exports = {getHomePage,getLoginPage,logout,getRegPage,getTourBySlug,getMyTour};