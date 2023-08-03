const httpStatus = require('http-status');
const nodemailer = require('nodemailer');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { driverkycService } = require('../services');

const createDriverkyc = catchAsync(async (req, res) => {
  console.log('.....1..........', req.body);
  try {
    const driverkyc = await driverkycService.createDriverkyc(req.body);
    res.status(httpStatus.CREATED).send(driverkyc);
  } catch(err) {
    console.log('....e....',err);
  }
});


// const getDriverkyc = catchAsync(async (req, res) => {
//   const driverkyc = await driverkycService.getDriverkycById(req.params.driverkycId);
//   if (!driverkyc) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Driverkyc not found');
//   }
//   res.send(driverkyc);
// });


module.exports = {
  createDriverkyc,
  // getDriverkyc,
};
