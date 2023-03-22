const httpStatus = require('http-status');
const { Taxi } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a taxi
 * @param {Object} taxiBody
 * @returns {Promise<Taxi>}
 */
const createTaxi = async (taxiBody) => {
  // if (await Taxi.isEmailTaken(taxiBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  return Taxi.create(taxiBody);
}

/**
 * Query for taxis
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTaxis = async (filter, options) => {
  const taxis = await Taxi.find();
  // const taxis = await Taxi.find(filter, options);

  return taxis;
};

/**
 * Get taxi by id
 * @param {ObjectId} id
 * @returns {Promise<Taxi>}
 */
const getTaxiById = async (id) => {
  return Taxi.findById(id);
};

/**
 * Get taxi by email
 * @param {string} email
 * @returns {Promise<Taxi>}
 */
const getTaxiByEmail = async (email) => {
  return Taxi.findOne({ email });
};

/**
 * Update taxi by id
 * @param {ObjectId} taxiId
 * @param {Object} updateBody
 * @returns {Promise<Taxi>}
 */
const updateTaxiById = async (taxiId, updateBody) => {
  const taxi = await getTaxiById(taxiId);
  if (!taxi) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Taxi not found');
  }
  if (updateBody.email && (await Taxi.isEmailTaken(updateBody.email, taxiId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(taxi, updateBody);
  await taxi.save();
  return taxi;
};

/**
 * Delete taxi by id
 * @param {ObjectId} taxiId
 * @returns {Promise<Taxi>}
 */
const deleteTaxiById = async (taxiId) => {
  const taxi = await getTaxiById(taxiId);
  if (!taxi) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Taxi not found');
  }
  await taxi.remove();
  return taxi;
};

module.exports = {
  createTaxi,
  queryTaxis,
  getTaxiById,
  getTaxiByEmail,
  updateTaxiById,
  deleteTaxiById,
};
