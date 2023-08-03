const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const contactusSchema = mongoose.Schema(
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
    message: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
contactusSchema.plugin(toJSON);
contactusSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The contactus's email
 * @param {ObjectId} [excludeContactusId] - The id of the contactus to be excluded
 * @returns {Promise<boolean>}
 */
contactusSchema.statics.isEmailTaken = async function (email, excludeContactusId) {
  const contactus = await this.findOne({ email, _id: { $ne: excludeContactusId } });
  return !!contactus;
};

/**
 * Check if password matches the contactus's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
contactusSchema.methods.isPasswordMatch = async function (password) {
  const contactus = this;
  return bcrypt.compare(password, contactus.password);
};

contactusSchema.pre('save', async function (next) {
  const contactus = this;
  if (contactus.isModified('password')) {
    contactus.password = await bcrypt.hash(contactus.password, 8);
  }
  next();
});

/**
 * @typedef Contactus
 */
const Contactus = mongoose.model('Contactus', contactusSchema);

module.exports = Contactus;
