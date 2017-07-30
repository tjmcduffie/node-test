/*global */
/**
 *
 * @flow
 */

"use strict";

export type RealEstateType = {
  metroAreaName: string,
  priceRange: string,
  propertyTaxes: string,
  homeAvailabilty: string,
};

const mongoose = require('mongoose');

const RealEstateSchema = new mongoose.Schema({
  metroAreaName: String,
  priceRange: String,
  propertyTaxes: String,
  homeAvailabilty: String,
});

const RealEstate = mongoose.model('RealEstate', RealEstateSchema);

module.exports = RealEstate;
