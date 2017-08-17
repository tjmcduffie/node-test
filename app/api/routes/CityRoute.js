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

const CitiesRoutePath: string = '/city/:state/:cityname';


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
    const {
      cityname,
      state,
    } = this._req.params;
    this._genResponse(() =>
      new Promise((resolve, reject) => {
        const conditions = {
          name: cityname,
          state,
        };
        const fields = null;
        const options = null;
        City.findOne(conditions, fields, options, (err, doc) => {
          console.log(conditions, fields, options, err, doc);
          if (err) {
            reject(new SystemError(err));
          }
          if (!doc) {
            reject(new NotFoundError());
          }
          resolve({
            city: doc,
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
