/*global */
/**
 *
 * @flow
 */

"use strict";

import type {WebRouteListType} from '~/app/lib/InternalRouteType';

const fetcherMock = (): Promise<*> => {
  return new Promise(resolve => {
    resolve({});
  });
};

const routes: WebRouteListType = [
  {
    Component: require('~/app/web/pages/SamplePage'),
    fetchData: fetcherMock,
    name: 'SampleRoute',
    path: '/',
  },{
    Component: require('~/app/web/pages/CitiesPage'),
    fetchData: require('~/app/web/pages/CitiesPage').genClientData,
    name: 'CitiesRoute',
    path: '/cities/:page?',
  },{
    Component: require('~/app/web/pages/CityPage'),
    fetchData: fetcherMock,
    name: 'CityRoute',
    path: '/city/:state/:cityname',
  },
];

module.exports = routes;
