/*global */
/**
 *
 * @flow
 */

"use strict";

export type CityDataMutableFields = {
  name: string,
  state: string,
  suggestedBy: string,
};

export type CityType = {
  _id: string,
  updated: string,
} & CityDataMutableFields;

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
  const formattedCity = city.replace(' ', '-').toLowerCase();
  const formattedState = state.replace(' ', '-').toLowerCase();
  return `${formattedState}--${formattedCity}`;
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
    callback,
  );
}

CitySchema.statics.findOneByCityAndStateAndUpdate = function(
  city: string,
  state: string,
  updates: CityDataMutableFields,
  options: ?Object,
  callback: (err: ?string, doc: ?Object) => void,
) {
  return this.findOneAndUpdate(
    {cityState: formatCityState(city, state)},
    updates,
    options,
    callback,
  );
}

CitySchema.statics.findOneByCityAndStateAndRemove = function(
  city: string,
  state: string,
  options: ?Object,
  callback: (err: ?string, doc: ?Object) => void,
) {
  return this.findOneAndRemove(
    {cityState: formatCityState(city, state)},
    options,
    callback,
  );
}

const City = mongoose.model('City', CitySchema);

module.exports = City;
