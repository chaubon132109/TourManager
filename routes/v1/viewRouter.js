const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const viewController = require('../../app/controllers/view.controller');
const authController = require('../../app/controllers/auth.controller');
const bookingController = require('../../app/controllers/booking.controller');
router
  .route('/')
  .get(
    bookingController.createBookingCheckout,
    authMiddleware.isLogged,
    viewController.getHomePage
  );
router
  .route('/tour/:slug')
  .get(
    authMiddleware.isLogged,
    viewController.getTourBySlug
  );
router
  .route('/login')
  .get(
    authMiddleware.isLogged,
    viewController.getLoginPage
  );
router
  .route('/logout')
  .get(
    authMiddleware.isLogged,
    viewController.logout
  );
router
  .route('/register')
  .get(
    viewController.getRegPage
  );
router.use(authMiddleware.protect);
router
  .route('/mytour')
  .get(
    viewController.getMyTour
  );

module.exports = router