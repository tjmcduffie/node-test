/*global */
/**
 *
 * @flow
 */

"use strict";

const {createBrowserHistory} = require('history');
// const history = require('history');

// TODO: make this a proper flowType
export type BrowserHistory = {
  listen: Function,
  location: Location,
  push: Function,
} 

module.exports = typeof document !== 'undefined' ? createBrowserHistory() : undefined;
