/*global */
/**
 *
 * @flow
 */

"use strict";

const URIParam = require('~/app/lib/util/URIParam');
const UrlPattern = require('url-pattern');

class URIBuilder {
  _params: {[string]: string | number | boolean};
  _path: UrlPattern;

  constructor(path: string) {
    this._params = {};
    this._path = new UrlPattern(path);
  }

  setParam(name: string, value: string | number | boolean): URIBuilder {
    this._params[name] = URIParam.prepare(value);
    return this;
  }

  toString(): string {
    return this._path.stringify(this._params);
  }
}

module.exports = URIBuilder;
