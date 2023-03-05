const httpStatus = require('http-status');
const { Flight } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a flight
 * @param {Object} flightBody
 * @returns {Promise<Flight>}
 */
const createFlight = async (flightBody) => {
  // if (await Flight.isEmailTaken(flightBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  return Flight.create(flightBody);
};

/**
 * Query for flights
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFlights = async (filter, options) => {
  const flights = await Flight.paginate(filter, options);
  return flights;
};

/**
 * Get flight by id
 * @param {ObjectId} id
 * @returns {Promise<Flight>}
 */
const getFlightById = async (id) => {
  return Flight.findById(id);
};

/**
 * Get flight by email
 * @param {string} email
 * @returns {Promise<Flight>}
 */
const getFlightByEmail = async (email) => {
  return Flight.findOne({ email });
};

/**
 * Update flight by id
 * @param {ObjectId} flightId
 * @param {Object} updateBody
 * @returns {Promise<Flight>}
 */
const updateFlightById = async (flightId, updateBody) => {
  const flight = await getFlightById(flightId);
  if (!flight) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Flight not found');
  }
  if (updateBody.email && (await Flight.isEmailTaken(updateBody.email, flightId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(flight, updateBody);
  await flight.save();
  return flight;
};

/**
 * Delete flight by id
 * @param {ObjectId} flightId
 * @returns {Promise<Flight>}
 */
const deleteFlightById = async (flightId) => {
  const flight = await getFlightById(flightId);
  if (!flight) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Flight not found');
  }
  await flight.remove();
  return flight;
};

module.exports = {
  createFlight,
  queryFlights,
  getFlightById,
  getFlightByEmail,
  updateFlightById,
  deleteFlightById,
};
