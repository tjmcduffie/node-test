/*global */
/**
 *
 * @flow
 */

"use strict";

const PARAM_INDICATOR = ':';

class RouteURIBuilder {
  _route: string;
  _params: Map<string, ?string>;
  _query: Map<string, ?string>;

  constructor(route: string) {
    this._route = route;
    this._params = new Map();
    this._query = new Map();

    this._extractParams();
  }

  _extractParams(): void {
    const parts = this._route.split('/');
    parts.forEach(part => {
      if (part[0] === PARAM_INDICATOR) {
        const key = part.replace(PARAM_INDICATOR, '');
        this._params.set(key, part);
      }
    });
  }

  setParam(key: string, value: string | number) {
    let store = this._query;
    if (this._params.has(key)) {
      store = this._params;
    }
    if (value !== null) {
      value = '' + value;
    }
    store.set(key, value);
    return this;
  }

  toString(): string {
    let routeString = this._route;
    let queryArray = [];
    let queryString = '';

    this._params.forEach((rawValue, rawKey) => {
      let value = encodeURIComponent(rawValue || '');
      routeString = routeString.replace(PARAM_INDICATOR + rawKey, value);
    });

    this._query.forEach((rawValue, rawKey) => {
      const value = encodeURIComponent(rawValue || '');
      queryArray.push(value ? rawKey + '=' + value : rawKey);
    });

    if (queryArray.length > 0) {
      queryString = '?' + queryArray.join('&');
    }

    return routeString + queryString;
  }

  getURIString(): string {
    return this.toString();
  }
}

module.exports = RouteURIBuilder;
