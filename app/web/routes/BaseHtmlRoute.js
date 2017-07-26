/*global ReactClass*/
/**
 *
 * @flow
 */

"use strict";

import type {$Request, $Response} from 'express';
import type {Element as ReactElement} from 'react';

const BaseError = require('~/app/lib/BaseError');
const DefaultContainer = require('~/app/web/components/layout/DefaultContainer');
const React = require('react');
const {NotFoundError} = require('~/app/lib/ServerErrors');

class BaseHtmlRoute {
  _container: ReactClass<*>;
  _layoutView: string;
  _pageComponent: ReactClass<*>;
  _pageTitle: string;
  _req: $Request;
  _res: $Response;

  constructor(req: $Request, res: $Response) {
    this._container = DefaultContainer;
    this._layoutView = 'Default';
    this._pageTitle = 'Test Page';
    this._req = req;
    this._res = res;
  }

  getContainer(): ReactClass<*> {
    return this._container;
  }

  setContainer(container: ReactClass<*>): void {
    this._container = container;
  }

  getLayoutView(): string {
    return this._layoutView;
  }

  setLayoutView(view: string): void {
    this._layoutView = view;
  }

  getPageComponent(): ReactClass<*> {
    return this._pageComponent;
  }

  setPageComponent(component: ReactClass<*>): void {
    this._pageComponent = component;
  }

  getPageTitle(): string {
    return this._pageTitle;
  }

  setPageTitle(title: string): void {
    this._pageTitle = title;
  }

  setDesktopResponse(data: Object): ReactElement<*> {
    if (!data) {
      throw new BaseHtmlRouteError('setDesktopResponse needs a data param');
    }
    throw new BaseHtmlRouteError('setDesktopResponse needs to be implemented');
  }

  genData(): Promise<Object> {
    return new Promise(resolve => {
      resolve({});
    });
  }

  async get(): Promise<*> {
    try {
      const pageData = await this.genData();
      const pageContent: ?Array<ReactElement<*>>|ReactElement<*> =
        this.setDesktopResponse(pageData);
      const pageContainer: ?ReactElement<*> = React.createElement(
        this.getContainer(),
        {
          pageData,
          children: pageContent,
        },
      );
      this._res
        .render(
          this.getLayoutView(),
          {
            title: this.getPageTitle(),
            children: pageContainer,
            initialData: JSON.stringify({
              [this.getPageComponent().name]: pageData,
            }, null, 2),
          },
        );
    } catch (e) {
      this._res.sendStatus(e.status || 500);
      throw e;
    }
  }
}

class BaseHtmlRouteError extends BaseError {}

module.exports = BaseHtmlRoute;
