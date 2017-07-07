/*global */
/**
 *
 * @flow
 */

"use strict";

const BaseError = require('~/app/lib/BaseError');
const DefaultContainer = require('~/app/web/components/layout/DefaultContainer');
const React = require('react');

import type {$Request, $Response} from 'express';
import type {Element as ReactElement} from 'react';

class BaseHtmlRoute {
  _container: string;
  _pageTitle: string;
  _req: $Request;
  _res: $Response;

  constructor(req: $Request, res: $Response) {
    this._container = DefaultContainer;
    this._pageTitle = 'Test Page';
    this._req = req;
    this._res = res;
  }

  getLayoutView(): string {
    return this._container;
  }

  setLayoutView(view: string): void {
    this._container = view;
  }

  getPageTitle(): string {
    return this._pageTitle;
  }

  setPageTitle(title: string): void {
    this._pageTitle = title;
  }

  setDesktopResponse(): ReactElement<*> {
    throw new BaseHtmlRouteError('setDesktopResponse needs to be implemented');
  }

  get(): void {
    let pageContent: ?ReactElement<*> = null;
    let children: ?Array<ReactElement<*>>|ReactElement<*> = null;

    try {
      children = this.setDesktopResponse();
      pageContent = React.createElement(this._container, {children});
    } catch (e) {
      this._res.sendStatus(500);
      return;
    }

    this._res
      .render(this.getLayoutView(), {
        title: this.getPageTitle(),
        children: pageContent,
      });
  }
}

class BaseHtmlRouteError extends BaseError {}

module.exports = BaseHtmlRoute;
