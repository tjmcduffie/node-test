/*global */
/**
 *
 * @flow
 */

"use strict";

import type {$Request, $Response} from 'express';
import type {Element as ReactElement} from 'react';

const BaseHtmlRoute = require('~/app/web/routes/BaseHtmlRoute');
const SamplePage = require('~/app/web/pages/SamplePage');
const React = require('react');

const SampleRoutePath: string = '/';

class SampleRoute extends BaseHtmlRoute {
  static getPath(): string {
    return SampleRoutePath;
  }

  constructor(req: $Request, res: $Response): void {
    super(req, res);
    this.setPageTitle('Sample');
  }

  setDesktopResponse(): ReactElement<*> {
    return React.createElement(SamplePage);
  }
}

module.exports = SampleRoute;
