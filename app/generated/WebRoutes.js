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
    Component: require('~/app/web/pages/CitiesPage'),
    fetchData: require('~/app/web/pages/CitiesPage').genClientData,
    method: 'get',
    name: 'CitiesRoute',
    path: '/cities/:page',
  },{
    Component: require('~/app/web/pages/CityPage'),
    fetchData: require('~/app/web/pages/CityPage').genClientData,
    method: 'get',
    name: 'CityRoute',
    path: '/city/:state/:cityname',
  },{
    Component: require('~/app/web/pages/SamplePage'),
    fetchData: fetcherMock,
    method: 'get',
    name: 'SampleRoute',
    path: '/',
  },
];

module.exports = routes;
