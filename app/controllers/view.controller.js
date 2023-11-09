const Tour = require('../models/tour');
const asyncHandle = require('../../middlewares/asyncHandle');
const ErrorRespone = require('../../middlewares/ErrorResponse');

let getHomePage = asyncHandle(async(req, res, next)=>{
    const tours = await Tour.find();
    res.status(200).render('home.hbs',{
        title : 'Homepage',
        tours
    });
});
module.exports = {getHomePage};