const httpStatus = require('http-status');
const { Contactus } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a taxi
 * @param {Object} taxiBody
 * @returns {Promise<Taxi>}
 */
const createContactus = async (taxiBody) => {
  // if (await Taxi.isEmailTaken(taxiBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  return Contactus.create(taxiBody);
}

module.exports = {
  createContactus
};
