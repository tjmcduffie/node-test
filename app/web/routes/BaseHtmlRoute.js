/*global */
/**
 * 
 * @flow
 */

"use strict";

const BaseError = require('~/app/lib/BaseError');
const DefaultLayout = require('~/app/web/layouts/Default');
const React = require('react');

import type {$Request, $Response} from 'express';
import type {Element as ReactElement} from 'react';

class BaseHtmlRoute {
  _layoutView: string;
  _pageTitle: string;
  _req: $Request;
  _res: $Response;

  constructor(req: $Request, res: $Response) {
    this._layoutView = 'Default';
    this._pageTitle = 'Test Page';
    this._req = req;
    this._res = res;
  }

  getLayoutView(): string {
    return this._layoutView;
  }

  setLayoutView(view: string): void {
    this._layoutView = view;
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

  get() {
    let pageContent: ?ReactElement<*> = null;
    let children: ?Array<ReactElement<*>>|ReactElement<*> = null;

    try {
      children = this.setDesktopResponse();
      pageContent = React.createElement(DefaultLayout, {children});
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
