/*global */
/**
 *
 * @flow
 */

"use strict";

import type {ApiRouteListType} from '~/app/lib/InternalRouteType';

const routes: ApiRouteListType = [
  {
    methods: ['GET'],
    name: 'CityRoute',
    path: '/api/city/:state/:cityname',
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
