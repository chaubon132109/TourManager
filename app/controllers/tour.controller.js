const asyncHandle = require('../../middlewares/asyncHandle')
const Tours = require('../models/tour');
const APIFeatures = require('../../middlewares/APIFeatures');
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
    res.status(200).json({
        status: 'success',
        total: tour.length,
        data:{
            tour
        }
    });
});
let createTour = asyncHandle(async (req, res, next) => {
      const newTour = await Tours.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          newTour
        },
      });
    
  });
  let deleteTour = async(req,res,next)=>{
    try{
      const deleteTour = await Tours.findByIdAndDelete(req.params.id);
      res.status(201).json({
        status: 'success',
        data: {
          deleteTour,
        },
      });
    }catch(error){
      res.status(400).json({
        status: 'fail',
        message: error.message,
      });
    }
  }
  let updateTour = async(req,res,next)=>{
    try{
      const updateTour = await Tours.findByIdAndUpdate(req.params.id, req.body);
      res.status(201).json({
        status: 'success',
        data: {
          updateTour,
        },
      });
    }catch(error){
      res.status(400).json({
        status: 'fail',
        message: error.message,
      });
    }
  }
module.exports = {getAllTours,getTour,createTour,deleteTour,updateTour}

