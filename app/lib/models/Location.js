/*global */
/**
 *
 * @flow
 */

"use strict";

export type LocationDataMutableFields = {
  name: string,
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
  locationState: {
    index: true,
    lowercase: true,
    unique: true,
    type: String,
  },
  name: {
    alias: 'location',
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

function formatLocationState(location: string, state: string): string {
  const formattedLocation = location.replace(' ', '-').toLowerCase();
  const formattedState = state.replace(' ', '-').toLowerCase();
  return `${formattedState}--${formattedLocation}`;
}

LocationSchema.pre('save', function(next) {
  this.locationState = formatLocationState(this.name, this.state);
  next();
});

LocationSchema.statics.findOneByLocationAndState = function(
  location: string,
  state: string,
  fields: ?Object,
  options: ?Object,
  callback: (err: ?string, doc: ?Object) => void,
) {
  return this.findOne(
    {locationState: formatLocationState(location, state)},
    fields,
    options,
    callback,
  );
}

LocationSchema.statics.findOneByLocationAndStateAndUpdate = function(
  location: string,
  state: string,
  updates: LocationDataMutableFields,
  options: ?Object,
  callback: (err: ?string, doc: ?Object) => void,
) {
  return this.findOneAndUpdate(
    {locationState: formatLocationState(location, state)},
    updates,
    options,
    callback,
  );
}

LocationSchema.statics.findOneByLocationAndStateAndRemove = function(
  location: string,
  state: string,
  options: ?Object,
  callback: (err: ?string, doc: ?Object) => void,
) {
  return this.findOneAndRemove(
    {locationState: formatLocationState(location, state)},
    options,
    callback,
  );
}

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
