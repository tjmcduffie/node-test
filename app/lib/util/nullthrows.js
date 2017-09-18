/*global */
/**
 *
 * @flow
 */

"use strict";

module.exports = function<T>(x: ?T): T {
  if (x != null) {
    return x;
  }

  throw new Error('Got an unexpected null or undefined');
}
