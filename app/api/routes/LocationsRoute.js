/*global */
/**
 *
 * @flow
 */

"use strict";

import type {LocationType} from '~/app/lib/models/Location';
import type {NextFunction, $Request, $Response} from 'express';

export type LocationsData = {
  locations: Array<LocationType>,
};

const BaseJsonApiRoute = require('~/app/api/routes/BaseJsonApiRoute');
const Location = require('~/app/lib/models/Location');
const {NotFoundError, SystemError} = require('~/app/lib/ServerErrors');

const LocationsRoutePath: string = '/api/locations/:page';
const CITIES_COUNT = 25;


class LocationsRoute extends BaseJsonApiRoute {
  static getPath() {
    return LocationsRoutePath;
  }

  constructor(req: $Request, res: $Response, next: NextFunction): void {
    super(req, res, next);
    this.setVesions(new Map([
      ['DELETE', {'1.0.0': () => this.delete_v1_0_0()}],
      ['GET', {'1.0.0': () => this.get_v1_0_0()}],
      ['POST', {'1.0.0': () => this.post_v1_0_0()}],
      ['PUT', {'1.0.0': () => this.put_v1_0_0()}],
    ]));
  }

  async delete_v1_0_0() {
    this._res.status(404);
  }

  get_v1_0_0() {
    const {page: pageParam} = this._req.params;
    const page = parseInt(pageParam, 10) || 0;
    const skip = CITIES_COUNT * page;
    this._genResponse(() =>
      new Promise((resolve, reject) => {
        const conditions = {};
        const fields = null;
        const options = {
          limit: CITIES_COUNT,
          skip,
        };
        Location.find(conditions, fields, options, (err, docs) => {
          if (err) {
            reject(new SystemError(err));
          }
          if (docs.length < 1) {
            reject(new NotFoundError());
          }
          resolve({
            locations: docs,
          });
        });
      })
    );
  }

  post_v1_0_0() {
    this._res.status(404);
  }
  put_v1_0_0() {
    this._res.status(404);
  }
}

module.exports = LocationsRoute;
