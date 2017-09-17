/*global */
/**
 *
 * //flow
 */

"use strict";

const express = require('express');

const router = express.Router();
const ROUTE_PREFIX = '';

// middleware

// routes
[
  require('~/app/web/routes/SampleRoute'),
  require('~/app/web/routes/LocationsRoute'),
  require('~/app/web/routes/LocationRoute'),
].forEach(Route => {
  router.route(Route.getPath())
    .get((req, res, next) => (new Route(req, res, next)).get());
});

module.exports = {
  router,
  routePrefix: ROUTE_PREFIX,
};
