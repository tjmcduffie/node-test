/*global */
/**
 *
 * @flow
 */

 "use strict";

import type {NextFunction, $Request, $Response} from 'express';
import type {RouteMethodTypes} from '~/app/lib/InternalRouteType';

export type MethodVersionHash = {[string]: Function};
export type Response = {
  data: Object,
  error: ?{
    message: string,
    name: string,
    status: number,
  },
};

const setVersions = require('express-routes-versioning')();

class BaseJsonApiRoute {
  _next: NextFunction;
  _req: $Request;
  _res: $Response;
  _versionMap: Map<RouteMethodTypes, MethodVersionHash>;

  constructor(req: $Request, res: $Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
  }

  setVesions(versions: Map<RouteMethodTypes, MethodVersionHash>) {
    this._versionMap = versions;
  }

  delete() {
    this._handleRequest('DELETE');
  }

  get() {
    this._handleRequest('GET');
  }

  post() {
    this._handleRequest('POST');
  }

  put() {
    this._handleRequest('PUT');
  }

  _handleRequest(method: RouteMethodTypes) {
    const versionedCall = setVersions(this._versionMap.get(method));
    versionedCall(this._req);
  }

  async _genResponse(genData: () => Promise<Object>) {
    const responseData: Response = {
      data: {},
      error: null,
    };
    let status = 200;
    try {
      responseData.data = await genData();
    } catch (e) {
      status = e.status || 500
      responseData.error = {
        message: e.message,
        name: e.name,
        status: e.status,
      };
    }
    this._res.status(status).json(responseData);
  }
}

module.exports = BaseJsonApiRoute;
