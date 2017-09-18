/*global */
/**
 *
 * @flow
 */

"use strict";

export type LocationDataMutableFields = {
  city: string,
  state: string,
  suggestedBy: string,
};

export type LocationType = {
  _id: string,
  updated: string,
} & LocationDataMutableFields;

export type LocationData = {
  location: LocationType,
};

export type LocationsData = {
  locations: Array<LocationType>,
};

const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  cityState: {
    index: true,
    lowercase: true,
    unique: true,
    type: String,
  },
  city: {
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

LocationSchema.pre('save', function(next) {
  this.cityState = formatCityState(this.city, this.state);
  next();
});

LocationSchema.statics.findOneByCityAndState = function(
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

LocationSchema.statics.findOneByCityAndStateAndUpdate = function(
  city: string,
  state: string,
  updates: LocationDataMutableFields,
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

LocationSchema.statics.findOneByCityAndStateAndRemove = function(
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

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
