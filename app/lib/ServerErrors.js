/*global */
/**
 *
 * @flow
 */

"use strict";

const BaseError = require('~/app/lib/BaseError');

class ForbiddenError extends BaseError {
  status: number = 403;
}

class NotFoundError extends BaseError {
  status: number = 404;
}

class SystemError extends BaseError {
  status: number = 500;
}

module.exports = {
  ForbiddenError,
  NotFoundError,
  SystemError,
}
