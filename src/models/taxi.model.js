const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const taxiSchema = mongoose.Schema(
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
    typeOfCar: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
taxiSchema.plugin(toJSON);
taxiSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The taxi's email
 * @param {ObjectId} [excludeTaxiId] - The id of the taxi to be excluded
 * @returns {Promise<boolean>}
 */
taxiSchema.statics.isEmailTaken = async function (email, excludeTaxiId) {
  const taxi = await this.findOne({ email, _id: { $ne: excludeTaxiId } });
  return !!taxi;
};

/**
 * Check if password matches the taxi's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
taxiSchema.methods.isPasswordMatch = async function (password) {
  const taxi = this;
  return bcrypt.compare(password, taxi.password);
};

taxiSchema.pre('save', async function (next) {
  const taxi = this;
  if (taxi.isModified('password')) {
    taxi.password = await bcrypt.hash(taxi.password, 8);
  }
  next();
});

/**
 * @typedef Taxi
 */
const Taxi = mongoose.model('Taxi', taxiSchema);

module.exports = Taxi;
