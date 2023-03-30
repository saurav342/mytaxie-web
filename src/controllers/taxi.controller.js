const httpStatus = require('http-status');
const nodemailer = require('nodemailer');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { taxiService } = require('../services');

const createTaxi = catchAsync(async (req, res) => {
  console.log('.....1..........', req.body);
  try {
    const taxi = await taxiService.createTaxi(req.body);

    const client = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "mytaxie2022@gmail.com",
        pass: "iehdeorjinibwiad"
      }
    });

    const { from, to, phoneNumber, date, typeOfCar } = req.body;

    let info = await client.sendMail(
      {
        from: "mytaxie2022@gmail.com",
        to: "sauravonga@gmail.com",
        subject: "New Taxi Booking Request",
        text: `Please find below the taxi booking details :  \n From : ${from} 
        \n To : ${to}
        \n Phone Number : ${phoneNumber}
        \n Date : ${date}
        \n Type : ${typeOfCar}
        `,
      }
    )
    console.log("Message sent: %s", info.messageId);

    res.status(httpStatus.CREATED).send(taxi);
  } catch (err) {
    console.log('....e....', err);
  }

});

const getTaxis = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await taxiService.queryTaxis(filter, options);
  res.send(result);
});

const getTaxi = catchAsync(async (req, res) => {
  const taxi = await taxiService.getTaxiById(req.params.taxiId);
  if (!taxi) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Taxi not found');
  }
  res.send(taxi);
});

const updateTaxi = catchAsync(async (req, res) => {
  const taxi = await taxiService.updateTaxiById(req.params.taxiId, req.body);
  res.send(taxi);
});

const deleteTaxi = catchAsync(async (req, res) => {
  await taxiService.deleteTaxiById(req.params.taxiId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTaxi,
  getTaxis,
  getTaxi,
  updateTaxi,
  deleteTaxi,
};
