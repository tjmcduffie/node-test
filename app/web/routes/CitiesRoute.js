/*global */
/**
 *
 * @flow
 */

"use strict";

import type {CitiesData} from '~/app/lib/models/City';
import type {$Request, $Response} from 'express';
import type {Element as ReactElement} from 'react';

const BaseHtmlRoute = require('~/app/web/routes/BaseHtmlRoute');
const CitiesPage = require('~/app/web/pages/CitiesPage');
const City = require('~/app/lib/models/City');
const React = require('react');
const {NotFoundError, SystemError} = require('~/app/lib/ServerErrors');

const CitiesRoutePath: string = '/cities/:page?';
const CITIES_COUNT = 25;

class CitiesRoute extends BaseHtmlRoute {
  static getPath(): string {
    return CitiesRoutePath;
  }

  constructor(req: $Request, res: $Response): void {
    super(req, res);
    this.setPageComponent(CitiesPage);
    this.setPageTitle('Cities');
  }

  genData(): Promise<CitiesData> {
    const {page: pageParam} = this._req.params;
    const page = parseInt(pageParam, 10) || 0;
    const skip = CITIES_COUNT * page;
    return new Promise((resolve, reject) => {
      const conditions = {};
      const fields = null;
      const options = {
        limit: CITIES_COUNT,
        skip,
      };
      City.find(conditions, fields, options, (err, docs) => {
        if (err) {
          reject(new SystemError(err));
        }
        if (docs.length < 1) {
          reject(new NotFoundError());
        }
        resolve({
          cities: docs,
        });
      });
    });
  }

  setDesktopResponse(data: CitiesData): ReactElement<*> {
    return React.createElement(this.getPageComponent(), data);
  }
}

module.exports = CitiesRoute;
