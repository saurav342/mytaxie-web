const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const contactusController = require('../../controllers/contactus.controller');

const router = express.Router();

router
  .route('/')
  .post(contactusController.createContactus)
  // .get(contactusController.getContactus);
  
module.exports = router;
