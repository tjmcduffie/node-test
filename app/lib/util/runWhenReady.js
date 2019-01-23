/*global */
/**
 *
 * @flow
 */

"use strict";

const BaseError = require('~/app/lib/BaseError');

class RunWhenReadyError extends BaseError {}

module.exports = function runWhenReady(callback?: () => void) {
  if (!callback) {
    throw new RunWhenReadyError('callback not provided!');
  }

  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && document?.documentElement?.doScroll)
  ) {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}
