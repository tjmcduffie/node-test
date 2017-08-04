/*global */
/**
 *
 * @flow
 */

"use strict";

const WebRoutes = require('~/app/generated/WebRoutes');
const Routr = require('routr');

module.exports = new Routr(WebRoutes);
