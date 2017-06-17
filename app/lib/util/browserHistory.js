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

let browserHistory = undefined;

module.exports = (): ?BrowserHistory => {
  if (browserHistory === undefined && typeof document !== 'undefined') {
    browserHistory = createBrowserHistory();
  }
  return browserHistory;
}
