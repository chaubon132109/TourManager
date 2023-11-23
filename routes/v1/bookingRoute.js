const express = require('express');
const bookingController = require('../../app/controllers/booking.controller');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/checkout-session', bookingController.getCheckoutSession);

router.use(authMiddleware.retrictTo('admin','lead-guide'));

router
    .route('/')
    .get(bookingController.getAllBooking)
    .post(bookingController.createBooking)
router
    .route('/:id')
    .get(bookingController.getBooking)
    .patch(bookingController.updateBooking)
    .delete(bookingController.deleteBooking)
module.exports = router;