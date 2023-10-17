
const tours = require('../models/tour');

let getAllTours = async(req, res, next) => {
    const tour = await tours.find();
    res.status(200).json({
        status: 'success',
        total: tour.length,
        data:{
            tour
        }
    });
};
let getTour = async(req,res,next)=>{
    const tour = await tours.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        total: tour.length,
        data:{
            tour
        }
    });
};
let createTour = async(req,res,next)=>{
    const newTour = await tours.create(req.body);
    res.status(200).json({
        status: 'success',
        data:{
            newTour
        }
    });
};
module.exports = {getAllTours,getTour,createTour}

