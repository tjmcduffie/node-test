/*global */
/**
 *
 * @flow
 */

"use strict";

import type {$Request, $Response} from 'express';
import type {Element as ReactElement} from 'react';

const BaseHtmlRoute = require('~/app/web/routes/BaseHtmlRoute');
const ErrorNotFoundPage = require('~/app/web/components/pages/ErrorNotFoundPage');
const React = require('react');

const errorNotFoundRoutePath: string = '*'

class ErrorNotFoundRoute extends BaseHtmlRoute {
  static getPath(): string {
    return errorNotFoundRoutePath;
  }

  constructor(req: $Request, res: $Response): void {
    super(req, res);
    this.setPageTitle('Error, page not found');
  }

  setDesktopResponse(): ReactElement<*> {
    return React.createElement(ErrorNotFoundPage);
  }
}

module.exports = ErrorNotFoundRoute;
