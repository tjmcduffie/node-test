/*global */
/**
 *
 * @flow
 */

"use strict";

const AllRoutes = require('~/app/web/generated/AllRoutes');
const Routr = require('routr');

module.exports = new Routr(AllRoutes);
