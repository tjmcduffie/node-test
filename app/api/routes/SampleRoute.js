/*global */
/**
 *
 * @flow
 */

"use strict";

import type {NextFunction, $Request, $Response} from 'express';

const BaseJsonApiRoute = require('~/app/api/routes/BaseJsonApiRoute');
const BaseError = require('~/app/lib/BaseError');

class TestRoute extends BaseJsonApiRoute {
  static getPath() {
    return '/sample/?';
  }

  constructor(req: $Request, res: $Response, next: NextFunction): void {
    super(req, res, next);
    this.setVesions(new Map([
      ['DELETE', {'1.0.0': () => this.delete_v1_0_0()}],
      ['GET', {
        '1.0.0': () => this.get_v1_0_0(),
        '~2.2.1': () => this.get_v2_2_1(),
      }],
      ['POST', {'1.0.0': () => this.post_v1_0_0()}],
      ['PUT', {'1.0.0': () => this.put_v1_0_0()}],
    ]));
  }

  async delete_v1_0_0() {
    this._genResponse(() =>
      new Promise((resolve) => {
        resolve({message: 'sample:delete'});
      })
    );
  }

  get_v1_0_0() {
    this._genResponse(() =>
      new Promise((resolve) => {
        resolve({message: 'sample:get:1.0.0'});
      })
    );
  }

  get_v2_2_1() {
    this._genResponse(() =>
      new Promise((resolve) => {
        resolve({message: 'sample:get:2.2.1'});
      })
    );
  }

  post_v1_0_0() {
    this._genResponse(() =>
      new Promise((resolve) => {
        resolve({message: 'sample:post'});
      })
    );
  }
  put_v1_0_0() {
    this._genResponse(() =>
      new Promise((_, reject) => {
        const e = new TestRouteError('sample:put:error');
        e.status = 500;
        reject(e);
      })
    );
  }
}

class TestRouteError extends BaseError {}

module.exports = TestRoute;
