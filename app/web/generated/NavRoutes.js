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
    displayName: 'sample',
    name: 'SampleRoute',
    method: 'get',
    path: '/',
    action: (params: Object, query: Object): pageRenderer => {
      const SamplePage = require('~/app/web/pages/SamplePage');
      return renderPage(SamplePage)(params, query);
    },
  },{
    displayName: 'cities',
    name: 'CitiesRoute',
    method: 'get',
    path: '/cities/:page?',
    action: (params: Object, query: Object): pageRenderer => {
      const CitiesPage = require('~/app/web/pages/CitiesPage');
      return renderPage(CitiesPage)(params, query);
    },
  },
];

module.exports = routes;
