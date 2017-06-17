/*global */
/**
 * 
 * @flow
 */

"use strict";

const BaseHtmlRoute = require('~/app/web/routes/BaseHtmlRoute');
const HomePage = require('~/app/web/components/pages/HomePage');
const React = require('react');

import type {$Request, $Response} from 'express';
import type {Element as ReactElement} from 'react';

const homeRoutePath: string = '/';

class HomeRoute extends BaseHtmlRoute {
  static getPath(): string {
    return homeRoutePath;
  }

  constructor(req: $Request, res: $Response) {
    super(req, res);
    this.setPageTitle('Home');
  }

  setDesktopResponse(): ReactElement<*> {
    return React.createElement(HomePage);
  }
}

module.exports = HomeRoute;
