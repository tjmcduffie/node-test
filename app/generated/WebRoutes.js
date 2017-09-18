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
    Component: require('~/app/web/pages/LocationsPage'),               // const LocationsPage = ((require('~/app/web/pages/LocationsPage')));
    fetchData: require('~/app/web/pages/LocationsPage').genClientData, // always genClientData
    method: 'get',                                                  // web only allows get
    name: 'LocationsRoute',                                            // class ((LocationsRoute)) extends BaseHtmlRoute {
    path: '/locations/:page?',                                         // const LocationsRoutePath: string = (('/locations/:page?'));
  },{
    Component: require('~/app/web/pages/LocationPage'),
    fetchData: require('~/app/web/pages/LocationPage').genClientData,
    method: 'get',
    name: 'LocationRoute',
    path: '/location/:state/:city',
  },{
    Component: require('~/app/web/pages/SamplePage'),
    fetchData: fetcherMock,
    method: 'get',
    name: 'SampleRoute',
    path: '/',
  },
];

module.exports = routes;
