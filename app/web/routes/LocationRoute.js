/*global */
/**
 *
 * @flow
 */

"use strict";

import type {LocationData} from '~/app/lib/models/Location';
import type {$Request, $Response} from 'express';
import type {Element as ReactElement} from 'react';


const BaseHtmlRoute = require('~/app/web/routes/BaseHtmlRoute');
const Location = require('~/app/lib/models/Location');
const LocationPage = require('~/app/web/pages/LocationPage');
const React = require('react');

const LocationRoutePath: string = '/location/:state/:city';

class LocationRoute extends BaseHtmlRoute {
  static getPath(): string {
    return LocationRoutePath;
  }

  constructor(req: $Request, res: $Response): void {
    super(req, res);
    this.setPageComponent(LocationPage);
    this.setPageTitle('Location');
  }

  genData(): Promise<LocationData> {
    const {
      city,
      state,
    } = this._req.params;
    return new Promise((resolve, reject) => {
      const fields = null;
      const options = null;
      Location.findOneByCityAndState(
        city,
        state,
        fields,
        options,
        (err, doc) => {
          if (err) {
            reject(err);
          }
          resolve({location: doc});
        }
      );
    });
  }

  setDesktopResponse(data: LocationData): ReactElement<*> {
    return React.createElement(this.getPageComponent(), data);
  }
}

module.exports = LocationRoute;
