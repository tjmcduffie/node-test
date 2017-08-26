/*global */
/**
 *
 * @flow
 */

"use strict";

class URIParam {
  static prepare(param): string {
    return param.replace(' ', '-').toLowerCase();
  }
}

module.exports = URIParam;
