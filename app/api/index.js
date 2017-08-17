/*global */
/**
 *
 * //flow
 */

"use strict";

const express = require('express');

const router = express.Router();
const ROUTE_PREFIX = '/api';

// middleware

// routes
[
  require('~/app/api/routes/CityRoute'),
  require('~/app/api/routes/CitiesRoute'),
  require('~/app/api/routes/SampleRoute'),
].forEach(Route => {
  router.route(Route.getPath())
    .delete((req, res, next) => (new Route(req, res, next)).delete())
    .get((req, res, next) => (new Route(req, res, next)).get())
    .post((req, res, next) => (new Route(req, res, next)).post())
    .put((req, res, next) => (new Route(req, res, next)).put());
});

module.exports = {
  router,
  routePrefix: ROUTE_PREFIX,
};
