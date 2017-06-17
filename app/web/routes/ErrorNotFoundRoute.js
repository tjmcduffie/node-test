/*global */
/**
 * 
 * @flow
 */

"use strict";

const BaseHtmlRoute = require('~/app/web/routes/BaseHtmlRoute');
const ErrorNotFoundPage = require('~/app/web/components/pages/ErrorNotFoundPage');
const React = require('react');

import type {$Request, $Response} from 'express';
import type {Element as ReactElement} from 'react';

const errorNotFoundRoutePath = '*'

class ErrorNotFoundRoute extends BaseHtmlRoute {
  static getPath() {
    return errorNotFoundRoutePath;
  }

  constructor(req: $Request, res: $Response) {
    super(req, res);
    this.setPageTitle('Error, page not found');
  }

  setDesktopResponse(): ReactElement<*> {
    return React.createElement(ErrorNotFoundPage);
  }
}

module.exports = ErrorNotFoundRoute;
