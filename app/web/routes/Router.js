/*global */
/**
 *
 * @flow
 */

"use strict";

const AllRoutes = require('~/app/generated/webRoutes');
const Routr = require('routr');

module.exports = new Routr(AllRoutes);
