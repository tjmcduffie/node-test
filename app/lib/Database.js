/*global */
/**
 *
 * @flow
 */

"use strict";

const mongoose = require('mongoose');

const DB_NAME = 'grimlock-city-living';

const connect = (): Promise<*> => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://localhost/${DB_NAME}`, {auto_reconnect: true});

    mongoose.connection.on('error', function(err) {
      console.error(`Failed to connect to DB ${DB_NAME} on startup`, err);
      reject(err);
    });

    mongoose.connection.on('connected', function() {
      console.log(`Connected to ${DB_NAME} DB!`);
      resolve();
    });
  });
}

mongoose.connection.on('disconnected', function () {
  console.log(`Mongoose default connection to DB :${DB_NAME} disconnected`);
});

const exit = (): void => {
  mongoose.connection.close(function () {
    console.log(`Mongoose default connection with DB :${DB_NAME} is disconnected
      through app termination`);
    process.exit(0);
  });
}

process
  .on('SIGINT', exit)
  .on('SIGTERM', exit);

module.exports = {
  connect,
  isConnected: !!(mongoose.connection.db),
}
