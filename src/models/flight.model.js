const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const flightSchema = mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    phoneNumber : {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
flightSchema.plugin(toJSON);
flightSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The flight's email
 * @param {ObjectId} [excludeFlightId] - The id of the flight to be excluded
 * @returns {Promise<boolean>}
 */
flightSchema.statics.isEmailTaken = async function (email, excludeFlightId) {
  const flight = await this.findOne({ email, _id: { $ne: excludeFlightId } });
  return !!flight;
};

/**
 * Check if password matches the flight's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
flightSchema.methods.isPasswordMatch = async function (password) {
  const flight = this;
  return bcrypt.compare(password, flight.password);
};

flightSchema.pre('save', async function (next) {
  const flight = this;
  if (flight.isModified('password')) {
    flight.password = await bcrypt.hash(flight.password, 8);
  }
  next();
});

/**
 * @typedef Flight
 */
const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
