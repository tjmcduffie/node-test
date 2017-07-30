/*global */
/**
 *
 * @flow
 */

"use strict";

export type WeatherType = {
  monthlyAverages: Array<{
    month: 1|2|3|4|5|6|7|8|9|10|11|12,
    high: number,
    low: number,
    rainInInches: number,
    snowInInches: number,
  }>,
  weatherExtremes: Array<string>,
};

const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  monthlyAverages: [{
    month: {
      type: Number,
      min: 1,
      max: 12,
    },
    high: Number,
    low: Number,
    rainInInches: Number,
    snowInInches: Number,
  }],
  weatherExtremes: [String],
});

const Weather = mongoose.model('Weather', WeatherSchema);

module.exports = Weather;
