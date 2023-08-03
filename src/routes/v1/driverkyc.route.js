const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const driverkycController = require('../../controllers/driverkyc.controller');

const router = express.Router();

router
  .route('/')
  .post(driverkycController.createDriverkyc)
  // .get(driverkycController.getDriverkyc);
  
module.exports = router;
