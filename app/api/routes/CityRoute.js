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

const CitiesRoutePath: string = '/api/city/:state/:cityname';


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

  delete_v1_0_0() {
    const {
      cityname,
      state,
    } = this._req.params;
    this._genResponse(() =>
      new Promise((resolve, reject) => {
        City.findOneByCityAndStateAndRemove(
          cityname,
          state,
          null, // options
          (err, city) => {
            if (err) {
              reject(new SystemError(err));
            }
            if (!city) {
              reject(new NotFoundError());
            }
            resolve({
              city,
            });
          },
        );
      })
    );
  }

  get_v1_0_0() {
    const {
      cityname,
      state,
    } = this._req.params;
    this._genResponse(() =>
      new Promise((resolve, reject) => {
        City.findOneByCityAndState(
          cityname,
          state,
          null, // fields
          null, // options
          (err, city) => {
            if (err) {
              reject(new SystemError(err));
            }
            if (!city) {
              reject(new NotFoundError());
            }
            resolve({
              city,
            });
          },
        );
      })
    );
  }

  post_v1_0_0() {
    const {
      cityname: name,
      state,
      suggestedBy,
    } = this._req.body;
    this._genResponse(() =>
      new Promise((resolve, reject) => {
        City.create(
          {
            name,
            state,
            suggestedBy,
          },
          (err, city) => {
            if (err) {
              reject(new SystemError(err));
            }
            resolve({city});
          },
        );
      })
    );
  }

  put_v1_0_0() {
    const {
      cityname: old_cityname,
      state: old_state,
    } = this._req.params;

    const {
      name: new_name,
      state: new_state,
      suggestedBy: new_suggestedBy,
    } = this._req.body;
    const updates = {};
    if (new_name) {
      updates.name = new_name;
    }
    if (new_state) {
      updates.state = new_state;
    }
    if (new_suggestedBy) {
      updates.suggestedBy = new_suggestedBy;
    }

    this._genResponse(() =>
      new Promise((resolve, reject) => {
        City.findOneByCityAndStateAndUpdate(
          old_cityname,
          old_state,
          updates,
          {new: true},
          (err, city) => {
            if (err) {
              reject(new SystemError(err));
            }
            if (!city) {
              reject(new NotFoundError());
            }
            resolve({city});
          },
        );
      })
    );
  }
}

module.exports = CitiesRoute;
