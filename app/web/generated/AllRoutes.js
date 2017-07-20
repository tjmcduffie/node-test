/*global */
/**
 *
 * @flow
 */

"use strict";

import type {InternalRouteListType} from '~/app/lib/InternalRouteType';
import type {pageRenderer} from '~/app/lib/util/renderpage';

const renderPage = require('~/app/lib/util/renderPage');

const routes: InternalRouteListType = [
  {
    name: 'SampleRoute',
    method: 'get',
    path: '/',
    action: (params: Object, query: Object): pageRenderer => {
      const SamplePage = require('~/app/web/pages/SamplePage');
      return renderPage(SamplePage)(params, query);
    },
  },{
    name: 'CitiesRoute',
    method: 'get',
    path: '/cities/:page?',
    action: (params: Object, query: Object): pageRenderer => {
      const CitiesPage = require('~/app/web/pages/CitiesPage');
      return renderPage(CitiesPage)(params, query);
    },
  },{
    name: 'CityRoute',
    method: 'get',
    path: '/city/:state/:cityname',
    action: (params: Object, query: Object): pageRenderer => {
      const CityPage = require('~/app/web/pages/CityPage');
      return renderPage(CityPage)(params, query);
    },
  },
];

module.exports = routes;
