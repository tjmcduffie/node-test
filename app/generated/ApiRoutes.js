/*global */
/**
 *
 * @flow
 */

"use strict";

import type {ApiRouteListType} from '~/app/lib/InternalRouteType';

const routes: ApiRouteListType = [
  {
    methods: ['DELETE', 'GET', 'POST', 'PUT'],
    name: 'SampleRoute',
    path: '/api/',
  },{
    methods: ['GET'],
    name: 'CitiesRoute',
    path: '/api/cities/:page?',
  },
];

module.exports = routes;
