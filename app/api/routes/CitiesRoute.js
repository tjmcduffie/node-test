/*global */
/**
 *
 * @flow
 */

"use strict";

import type {CityType} from '~/app/lib/models/City';
import type {NextFunction, $Request, $Response} from 'express';

export type CitiesData = {
  cities: Array<CityType>,
};

const BaseJsonApiRoute = require('~/app/api/routes/BaseJsonApiRoute');
const City = require('~/app/lib/models/City');
const {NotFoundError, SystemError} = require('~/app/lib/ServerErrors');

const CitiesRoutePath: string = '/api/cities/:page';
const CITIES_COUNT = 25;


class CitiesRoute extends BaseJsonApiRoute {
  static getPath() {
    return CitiesRoutePath;
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
        City.find(conditions, fields, options, (err, docs) => {
          if (err) {
            reject(new SystemError(err));
          }
          if (docs.length < 1) {
            reject(new NotFoundError());
          }
          resolve({
            cities: docs,
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

module.exports = CitiesRoute;
