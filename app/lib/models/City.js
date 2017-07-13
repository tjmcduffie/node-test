/*global */
/**
 *
 * @flow
 */

"use strict";

const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: String,
  state: String,
  suggestedBy: String,
  updated: { type: Date, default: Date.now },
});

const City = mongoose.model('City', CitySchema);

module.exports = City;
