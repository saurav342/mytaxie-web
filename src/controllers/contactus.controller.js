const httpStatus = require('http-status');
const nodemailer = require('nodemailer');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { contactusService } = require('../services');

const createContactus = catchAsync(async (req, res) => {
  console.log('.....1..........', req.body);
  try {
    const contactus = await contactusService.createContactus(req.body);

    const client = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "mytaxie2022@gmail.com",
        pass: "iehdeorjinibwiad"
      }
    });

    const { from, to, phoneNumber, date, typeOfCar, name } = req.body;

    const toMail = ["sauravonga@gmail.com"];
    let info = await client.sendMail(
      {
        from: "mytaxie2022@gmail.com",
        to: "mytaxie2022@gmail.com",
        bcc: toMail,
        subject: "New Contactus Booking Request",
        text: `Please find below the contactus booking details :  \n Name : ${name} 
        \n Email : ${email}
        \n Phone Number : ${phoneNumber}
        \n Message : ${message}
        `,
      }
    )
    console.log("Message sent: %s", info.messageId);

    res.status(httpStatus.CREATED).send(contactus);
  } catch (err) {
    console.log('....e....', err);
  }

});


// const getContactus = catchAsync(async (req, res) => {
//   const contactus = await contactusService.getContactusById(req.params.contactusId);
//   if (!contactus) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Contactus not found');
//   }
//   res.send(contactus);
// });


module.exports = {
  createContactus,
  // getContactus,
};
