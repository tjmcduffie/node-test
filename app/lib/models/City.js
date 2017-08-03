/*global */
/**
 *
 * @flow
 */

"use strict";

export type CityType = {
  _id: string,
  name: string,
  state: string,
  suggestedBy: 'Tim' | 'Kristine',
  updated: string,
}

export type CityData = {
  city: CityType,
};

export type CitiesData = {
  cities: Array<CityType>,
};

const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: String,
  state: String,
  suggestedBy: String,
  updated: { type: Date, default: Date.now },
});

const City = mongoose.model('City', CitySchema);

module.exports = City;
