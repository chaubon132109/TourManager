const express = require('express');
const userController = require('../../app/controllers/user.controller')
const route = express.Router();
route
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
route
    .route('/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .patch(userController.updateUser)
module.exports = route;