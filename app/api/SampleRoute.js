/*global */
/**
 * 
 * //flow
 */

"use strict";

const BaseJsonApiRoute = require('~/app/api/BaseJsonApiRoute');
const BaseError = require('~/app/lib/BaseError');
const expressRouteVersioning = require('express-routes-versioning');

const routesVersioning = expressRouteVersioning();

class TestRoute extends BaseJsonApiRoute {
  static getPath() {
    return '/test/?';
  }

  delete() {
    super.setResponseContent(() => {
      return "test:delete";
    });
  }

  get() {
    const versioner = routesVersioning({
      "1.0.0": () => this.get1_0_0(),
      "~2.2.1": () => this.get2_2_1(),
    });
    versioner(this._req);
  }

  get1_0_0() {
    super.setResponseContent(() => {
      return "test:get:1.0.0";
    });
  }

  get2_2_1() {
    super.setResponseContent(() => {
      return "test:get:2.2.1";
    });
  }

  post() {
    super.setResponseContent(() => {
      return "test:post";
    });
  }

  put() {
    super.setResponseContent(() => {
      throw new TestRouteError('test:put:error');
    });
  }
}

class TestRouteError extends BaseError {}

module.exports = TestRoute;
