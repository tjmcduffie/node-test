/*global */
/**
 *
 * @flow
 */

"use strict";

const ApiRoutes = require('~/app/generated/ApiRoutes');
const Routr = require('routr');

module.exports = new Routr(ApiRoutes);
