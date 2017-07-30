/*global */
/**
 *
 * Aflow
 */

"use strict";

import type {NextFunction, $Request, $Response} from 'express';

const BaseJsonApiRoute = require('~/app/api/BaseJsonApiRoute');
const {NotFoundError} = require('~/app/lib/ServerErrors');

const CitiesRoutePath: string = '/cities/:page?';
const CITIES_COUNT = 25;
const routesVersioning = expressRouteVersioning();


class CitiesRoute extends BaseJsonApiRoute {
  static getPath() {
    return CitiesRoutePath;
  }

  get() {
    const versioner = routesVersioning({
      "1.0.0": () => this.get1_0_0(),
    });
    versioner(this._req);
  }

  get1_0_0() {
    super.setResponseContent(() => {
      return "test:get:1.0.0";
    });
  }
}

module.exports = CitiesRoute;
