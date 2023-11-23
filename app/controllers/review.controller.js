const Review = require('../models/review');
const asyncHandle = require('../../middlewares/asyncHandle');
const APIFeatures = require('../../middlewares/APIFeatures');
const ErrorResponse = require('../../middlewares/ErrorResponse');

let setTourUserByIds = (req, res, next) => {
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    console.log(req.body);
    next();
};
let getAllReview = asyncHandle(async(req,res,next)=>{
    let filterTour = {};
    if(req.params.tourId) filterTour = {tour: req.params.tourId};
    const features = new APIFeatures(Review.find(filterTour),req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const reviews = await features.query();
    res.status(200).json({
        status: 'success',
        total: reviews.length,
        data: {
          reviews,
        },
    });
});
let getReview = asyncHandle(async(req,res,next)=>{
    const review = await Review.findById(req.params.id);
    if (!review) {
        return next(new ErrorResponse('No review found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
        review,
        },
    });
});
let createReview = asyncHandle(async (req, res, next) => {
    const newReview = await Review.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
        review: newReview,
        },
    });
});
let updateReview = asyncHandle(async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body);
    if (!review) {
      return next(new ErrorResponse('No review found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    });
});
let deleteReview = asyncHandle(async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return next(new ErrorResponse('No review found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
});
module.exports = {setTourUserByIds,getAllReview,getReview,createReview,updateReview,deleteReview};