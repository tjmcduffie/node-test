/*global */
/**
 *
 * //flow
 */

"use strict";

class BaseJsonApiRoute {
  constructor(req, res, next) {
    this._req = req;
    this._res = res;
    this._next = next;
  }

  _getResponseObject() {
    return {
      data: {},
      error: null,
    }
  }

  setResponseContent(data) {
    const responseData = this._getResponseObject();
    let status = 200;

    try {
      responseData.data = data();
    } catch (e) {
      status = 500;
      responseData.error = {
        name: e.name,
        message: e.message,
      };
    }
    this._res.status(status).json(responseData);
  }
}

module.exports = BaseJsonApiRoute;
