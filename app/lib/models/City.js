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
  cityState: {
    index: true,
    lowercase: true,
    // required: true,
    unique: true,
    type: String,
  },
  name: {
    alias: 'city',
    required: true,
    type: String,
  },
  state: {
    required: true,
    type: String,
  },
  suggestedBy: String,
  updated: {
    default: Date.now,
    type: Date,
  },
});

function formatCityState(city: string, state: string): string {
  const formattedCity = city.replace(' ', '--').toLowerCase();
  const formattedState = state.replace(' ', '--').toLowerCase();
  return `${formattedState}-${formattedCity}`;
}

CitySchema.pre('save', function(next) {
  this.cityState = formatCityState(this.name, this.state);
  next();
});

CitySchema.statics.findOneByCityAndState = function(
  city: string,
  state: string,
  fields: ?Object,
  options: ?Object,
  callback: (err: ?string, doc: ?Object) => void,
) {
  return this.findOne(
    {cityState: formatCityState(city, state)},
    fields,
    options,
    callback
  );
}

const City = mongoose.model('City', CitySchema);

module.exports = City;
