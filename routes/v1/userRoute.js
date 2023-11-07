const express = require('express');
const userController = require('../../app/controllers/user.controller');
const authMiddleware = require('../../middlewares/auth');
const uploadService = require('../../services/upload.service');
const route = express.Router();
route.use(authMiddleware.protect);
route
    .route('/me')
    .get(userController.getMe,userController.getUser)
    .patch(
        uploadService.uploadUserAvatar,
        uploadService.resizeAvatar,
        userController.updateMe
    )
    .delete(userController.deleteMe);
route
    .route('/update-my-password')
    .patch(userController.updateMyPassword)
route.use(authMiddleware.retrictTo('admin'));
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