const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const driverkycSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber : {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
driverkycSchema.plugin(toJSON);
driverkycSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The driverkyc's email
 * @param {ObjectId} [excludeDriverkycId] - The id of the driverkyc to be excluded
 * @returns {Promise<boolean>}
 */
driverkycSchema.statics.isEmailTaken = async function (email, excludeDriverkycId) {
  const driverkyc = await this.findOne({ email, _id: { $ne: excludeDriverkycId } });
  return !!driverkyc;
};

/**
 * Check if password matches the driverkyc's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
driverkycSchema.methods.isPasswordMatch = async function (password) {
  const driverkyc = this;
  return bcrypt.compare(password, driverkyc.password);
};

driverkycSchema.pre('save', async function (next) {
  const driverkyc = this;
  if (driverkyc.isModified('password')) {
    driverkyc.password = await bcrypt.hash(driverkyc.password, 8);
  }
  next();
});

/**
 * @typedef Driverkyc
 */
const Driverkyc = mongoose.model('Driverkyc', driverkycSchema);

module.exports = Driverkyc;
