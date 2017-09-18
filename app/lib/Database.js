/*global */
/**
 *
 * @flow
 */

"use strict";

const EnvEnum = require('~/app/lib/EnvEnum');
const mongoose = require('mongoose');

const DB_NAME = 'relocatr';
const ENV = process.env.NODE_ENV;

const connect = (): Promise<*> => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(`mongodb://localhost/${DB_NAME}`, {
        useMongoClient: true,
        config: {
          autoIndex: ENV !== EnvEnum.DEV ? false : true,
        },
      })
      .then(() => {
        console.log(`Connected to ${DB_NAME} DB!`);
        resolve();
      })
      .catch(err => {
        console.error(`Failed to connect to DB ${DB_NAME} on startup`, err);
        reject(err);
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
