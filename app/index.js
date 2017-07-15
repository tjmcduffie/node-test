/*global */
/**
 *
 * @flow
 */

"use strict";

const Database = require('~/app/lib/Database');
const server = require('~/app/server');

const PORT = process.env.PORT;
if (!Database.isConnected) {
  Database
    .connect()
    .then(() => server(PORT));
} else {
  server(PORT);
}
