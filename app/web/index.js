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
const routes = [
  require('~/app/web/routes/SampleRoute'),
  require('~/app/web/routes/CitiesRoute'),
  require('~/app/web/routes/CityRoute'),
]
routes.forEach(Route => {
  router.route(Route.getPath())
    .get((req, res) => (new Route(req, res)).get());
});

module.exports = {
  router,
  routePrefix: ROUTE_PREFIX,
  routes,
};
