const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { flightService } = require('../services');

const createFlight = catchAsync(async (req, res) => {
  console.log('.....1..........', req.body);
  try {
    const flight = await flightService.createFlight(req.body);
    res.status(httpStatus.CREATED).send(flight);
  } catch(err) {
    console.log('....e....',err);
  }
  
});

const getFlights = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await flightService.queryFlights(filter, options);
  res.send(result);
});

const getFlight = catchAsync(async (req, res) => {
  const flight = await flightService.getFlightById(req.params.flightId);
  if (!flight) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Flight not found');
  }
  res.send(flight);
});

const updateFlight = catchAsync(async (req, res) => {
  const flight = await flightService.updateFlightById(req.params.flightId, req.body);
  res.send(flight);
});

const deleteFlight = catchAsync(async (req, res) => {
  await flightService.deleteFlightById(req.params.flightId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFlight,
  getFlights,
  getFlight,
  updateFlight,
  deleteFlight,
};
