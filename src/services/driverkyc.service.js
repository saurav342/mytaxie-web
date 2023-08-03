const httpStatus = require('http-status');
const { Driverkyc } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a taxi
 * @param {Object} taxiBody
 * @returns {Promise<Taxi>}
 */
const createDriverkyc = async (taxiBody) => {
  // if (await Taxi.isEmailTaken(taxiBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  return Driverkyc.create(taxiBody);
}

module.exports = {
  createDriverkyc
};
