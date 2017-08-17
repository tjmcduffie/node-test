/*global */
/**
 *
 * @flow
 */

"use strict";

import type {CityData} from '~/app/lib/models/City';
import type {$Request, $Response} from 'express';
import type {Element as ReactElement} from 'react';


const BaseHtmlRoute = require('~/app/web/routes/BaseHtmlRoute');
const City = require('~/app/lib/models/City');
const CityPage = require('~/app/web/pages/CityPage');
const React = require('react');

const CityRoutePath: string = '/city/:state/:cityname';

class CityRoute extends BaseHtmlRoute {
  static getPath(): string {
    return CityRoutePath;
  }

  constructor(req: $Request, res: $Response): void {
    super(req, res);
    this.setPageComponent(CityPage);
    this.setPageTitle('City');
  }

  genData(): Promise<CityData> {
    const {
      cityname,
      state,
    } = this._req.params;
    return new Promise((resolve, reject) => {
      const fields = null;
      const options = null;
      City.findOneByCityAndState(
        cityname,
        state,
        fields,
        options,
        (err, doc) => {
          if (err) {
            reject(err);
          }
          resolve({city: doc});
        }
      );
    });
  }

  setDesktopResponse(data: CityData): ReactElement<*> {
    return React.createElement(this.getPageComponent(), data);
  }
}

module.exports = CityRoute;
