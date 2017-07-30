/*global */
/**
 *
 * @flow
 */

"use strict";

import type {$Request, $Response} from 'express';
import type {Element as ReactElement} from 'react';

const BaseHtmlRoute = require('~/app/web/routes/BaseHtmlRoute');
const Error500Page = require('~/app/web/pages/Error500Page');
const React = require('react');

const error500RoutePath: string = '/system-error'

class Error500Route extends BaseHtmlRoute {
  static getPath(): string {
    return error500RoutePath;
  }

  constructor(req: $Request, res: $Response): void {
    super(req, res);
    this.setPageComponent(Error500Page);
    this.setPageTitle('System Error');
  }

  setDesktopResponse(data: {}): ReactElement<*> {
    return React.createElement(this.getPageComponent(), data);
  }
}

module.exports = Error500Route;
