const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const flightRoute = require('./flight.route');
const taxiRoute = require('./taxi.route');
const contactusRoute = require('./contactus.route');
const driverkycRoute = require('./driverkyc.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/flight',
    route: flightRoute,
  },
  {
    path: '/taxi',
    route: taxiRoute,
  },
  {
    path: '/contactus',
    route: contactusRoute,
  },
  {
    path: '/driverkyc',
    route: driverkycRoute,
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
