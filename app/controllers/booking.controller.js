const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/booking');
const Tour = require('../models/tour');
const asyncHandle = require('../../middlewares/asyncHandle');
const APIFeatures = require('../../middlewares/APIFeatures');
const ErrorResponse = require('../../middlewares/ErrorResponse');

let getCheckoutSession = asyncHandle(async(req,res, next)=>{
    const currentTour = await Tour.findById(req.body.tourId);
    // const price = await stripe.prices.create({
    //     product: currentTour.id,
    //     unit_amount: currentTour.price * 100,  
    //     currency: 'usd',
    //     nickname: currentTour.name, 
    //     metadata: {
    //       description: currentTour.summary,
    //       image: `${req.protocol}://${req.get('host')}img/tours/${currentTour.imageCover}`
    //     },
    // });
    // const priceId = price.id;
    const session = await stripe.checkout.sessions.create({
        payment_method_types : ['card'],
        success_url: `${req.protocol}://${req.get('host')}/?tour=${req.body.tourId}&user=${req.user.id}&price=${currentTour.price}&dateStart=${req.body.dateStart}&note=${req.body.note}`,
        cancel_url: `${req.protocol}://${req.get('host')}/tour/${currentTour.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,
        line_items: [
            {
                price_data:{
                    currency: 'usd',
                    product_data:{
                        name : `${currentTour.name} Tour`,
                    },
                    unit_amount: currentTour.price * 100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
    });
    const sessionId = session.id;   
    res.status(200).json({
        status: 'success',
        session,
    });
});
let createBookingCheckout = asyncHandle(async (req,res,next)=>{
    const {tour,user,price,dateStart,note} = req.query;
    if (!tour || !user || !price || !dateStart) return next();
    await Booking.create({ tour, user, price,dateStart });

    res.redirect(req.originalUrl.split('?')[0]);
});
let createBooking = asyncHandle(async(req,res,next)=>{
    const newBooking = await Booking.create(req.body)
    res.status(200).json({
        status : 'success',
        data: {
            booking : newBooking,
        },
    });
});
let getAllBooking = asyncHandle(async(req, res, next)=>{
    const features = new APIFeatures(Booking.find(),req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
    const bookings = await features.query;
    res.status(200).json({
        status : 'success',
        data: {
            bookings
        },
    });
});
let getBooking = asyncHandle(async(req,res,next)=>{
    const booking = await Booking.findById(req.params.id);
    if(!booking){
        return next(new ErrorResponse("Cannot find booking with that ID",404));
    }
    res.status(200).json({
        status : 'success',
        data: {
            booking
        },
    });
});
let updateBooking = asyncHandle(async(req,res,next)=>{
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id,req.body);
    if(!updatedBooking){
        return next(new ErrorResponse("Cannot find booking with that ID",404));
    }
    res.status(200).json({
        status : 'success',
        data: {
            updatedBooking
        },
    });
});
let deleteBooking = asyncHandle(async(req,res,next)=>{
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id, req.body)
    if(!deletedBooking){
        return next(new ErrorResponse("Cannot find booking with that ID",404));
    }
    res.status(200).json({
        status : 'success',
        data: {
            deletedBooking
        },
    });
})
module.exports = {getCheckoutSession,createBookingCheckout,createBooking,getAllBooking,getBooking,updateBooking,deleteBooking}