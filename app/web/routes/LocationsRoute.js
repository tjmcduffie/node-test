/*global */
/**
 *
 * @flow
 */

"use strict";

import type {LocationsData} from '~/app/lib/models/Location';
import type {$Request, $Response} from 'express';
import type {Element as ReactElement} from 'react';

const BaseHtmlRoute = require('~/app/web/routes/BaseHtmlRoute');
const LocationsPage = require('~/app/web/pages/LocationsPage');
const Location = require('~/app/lib/models/Location');
const React = require('react');
const {NotFoundError, SystemError} = require('~/app/lib/ServerErrors');

const LocationsRoutePath: string = '/locations/:page?';
const CITIES_COUNT = 25;

class LocationsRoute extends BaseHtmlRoute {
  static getPath(): string {
    return LocationsRoutePath;
  }

  constructor(req: $Request, res: $Response): void {
    super(req, res);
    this.setPageComponent(LocationsPage);
    this.setPageTitle('Locations');
  }

  genData(): Promise<LocationsData> {
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
      Location.find(conditions, fields, options, (err, docs) => {
        if (err) {
          reject(new SystemError(err));
        }
        if (docs.length < 1) {
          reject(new NotFoundError());
        }
        resolve({
          locations: docs,
        });
      });
    });
  }

  setDesktopResponse(data: LocationsData): ReactElement<*> {
    return React.createElement(this.getPageComponent(), data);
  }
}

module.exports = LocationsRoute;
