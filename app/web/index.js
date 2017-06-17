/*global */
/**
 * 
 * //flow
 */

"use strict";

const ContactRoute = require('~/app/web/routes/ContactRoute');
const ErrorNotFoundRoute = require('~/app/web/routes/ErrorNotFoundRoute');
const express = require('express');
const HomeRoute = require('~/app/web/routes/HomeRoute');

const router = express.Router();
const ROUTE_PREFIX = '';

// middleware

// routes
const routes = [
  HomeRoute,
  ContactRoute,
  ErrorNotFoundRoute,
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
