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

const LocationsRoutePath: string = '/api/location/:state/:city';


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

  delete_v1_0_0() {
    const {
      city,
      state,
    } = this._req.params;
    this._genResponse(() =>
      new Promise((resolve, reject) => {
        Location.findOneByCityAndStateAndRemove(
          city,
          state,
          null, // options
          (err, location) => {
            if (err) {
              reject(new SystemError(err));
            }
            if (!location) {
              reject(new NotFoundError());
            }
            resolve({
              location,
            });
          },
        );
      })
    );
  }

  get_v1_0_0() {
    const {
      city,
      state,
    } = this._req.params;
    this._genResponse(() =>
      new Promise((resolve, reject) => {
        Location.findOneByCityAndState(
          city,
          state,
          null, // fields
          null, // options
          (err, location) => {
            if (err) {
              reject(new SystemError(err));
            }
            if (!location) {
              reject(new NotFoundError());
            }
            resolve({
              location,
            });
          },
        );
      })
    );
  }

  post_v1_0_0() {
    const {
      city,
      state,
      suggestedBy,
    } = this._req.body;
    this._genResponse(() =>
      new Promise((resolve, reject) => {
        Location.create(
          {
            city,
            state,
            suggestedBy,
          },
          (err, location) => {
            if (err) {
              reject(new SystemError(err));
            }
            resolve({location});
          },
        );
      })
    );
  }

  put_v1_0_0() {
    const {
      city: old_city,
      state: old_state,
    } = this._req.params;
    const {
      city: new_city,
      state: new_state,
      suggestedBy: new_suggestedBy,
    } = this._req.body;
    const updates = {};
    if (new_city) {
      updates.city = new_city;
    }
    if (new_state) {
      updates.state = new_state;
    }
    if (new_suggestedBy) {
      updates.suggestedBy = new_suggestedBy;
    }

    this._genResponse(() =>
      new Promise((resolve, reject) => {
        Location.findOneByCityAndStateAndUpdate(
          old_city,
          old_state,
          updates,
          {new: true},
          (err, location) => {
            if (err) {
              reject(new SystemError(err));
            }
            if (!location) {
              reject(new NotFoundError());
            }
            resolve({location});
          },
        );
      })
    );
  }
}

module.exports = LocationsRoute;
