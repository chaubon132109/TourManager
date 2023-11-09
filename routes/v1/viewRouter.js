const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const viewController = require('../../app/controllers/view.controller');

router
  .route('/')
  .get(
    authMiddleware.isLogged,
    viewController.getHomePage
  );
module.exports = router