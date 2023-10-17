const express = require('express');
const userController = require('../app/controllers/user.controller')
const route = express.Router();
route
    .route('/')
    .get(userController.getAllUser)

module.exports = route;