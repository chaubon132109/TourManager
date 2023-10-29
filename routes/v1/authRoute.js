const express = require('express');
const authController = require('../../app/controllers/auth.controller')
const route = express.Router();
route
    .route('/register')
    .post(authController.register)
route
    .route('/login')
    .post(authController.login)
route
    .route('/logout')
    .post(authController.logout)
route
    .route('/forget-password')  
    .post(authController.forgetPassword)
route
    .route('/reset-password/:token')  
    .post(authController.resetPassword)    
module.exports = route;

