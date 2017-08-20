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
    name: 'CityRoute',                  // class ((CitiesRoute)) extends BaseHtmlRoute {
    path: '/api/city/:state/:cityname', // const CitiesRoutePath: string = (('/cities/:page?'));
  },{
    methods: ['GET'],
    name: 'CitiesRoute',
    path: '/api/cities/:page?',
  },{
    methods: ['DELETE', 'GET', 'POST', 'PUT'],
    name: 'SampleRoute',
    path: '/api/',
  },
];

module.exports = routes;
