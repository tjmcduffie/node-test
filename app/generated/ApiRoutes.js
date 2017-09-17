/*global */
/**
 *
 * @flow
 */

"use strict";

import type {ApiRouteListType} from '~/app/lib/InternalRouteType';

const routes: ApiRouteListType = [
  {
    methods: ['GET'],                   // this is squirrely right now...
    name: 'LocationRoute',                  // class ((LocationsRoute)) extends BaseHtmlRoute {
    path: '/api/location/:state/:locationname', // const LocationsRoutePath: string = (('/locations/:page?'));
  },{
    methods: ['GET'],
    name: 'LocationsRoute',
    path: '/api/locations/:page?',
  },{
    methods: ['DELETE', 'GET', 'POST', 'PUT'],
    name: 'SampleRoute',
    path: '/api/',
  },
];

module.exports = routes;
