const asyncHandle = require('../../middlewares/asyncHandle')
const Tours = require('../models/tour');
const APIFeatures = require('../../middlewares/APIFeatures');
const ErrorResponse = require('../../middlewares/ErrorResponse');
let getAllTours = asyncHandle(async(req, res, next) => {
    const features = new APIFeatures(Tours.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const tours = await features.query;
    res.status(200).json({
        status: 'success',
        total: tours.length,
        data:{
            tours
        }
    });
});
let getTour = asyncHandle(async(req,res,next)=>{
    const tour = await Tours.findById(req.params.id);
    if(!tour){
      return next(new ErrorResponse('Unable to find tour with that ID',404));
    }
    res.status(200).json({
        status: 'success',
        total: tour.length,
        data:{
            tour
        }
    });
});
let createTour = asyncHandle(async (req, res, next) => {
  try{
    const newTour = await Tours.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newTour
      }
    });
  }catch(error){
    res.status(201).json({
      status: 'failed',
      data: {
        message: error.message
      }
    });
  }
      
    
  });
  let deleteTour = async(req,res,next)=>{
    const tour = await Tours.findByIdAndDelete(req.params.id);
    if(!tour){
      return next(new ErrorResponse('Unable to find tour with that ID',404));
    }
    res.status(201).json({
      status: 'success',
      data: {
        deleteTour,
      },
    });
  }
  let updateTour = async(req,res,next)=>{
    const tour = await Tours.findByIdAndUpdate(req.params.id, req.body);
    if(!tour){
      return next(new ErrorResponse('Unable to find tour with that ID',404));
    }
    res.status(201).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }
module.exports = {getAllTours,getTour,createTour,deleteTour,updateTour}

