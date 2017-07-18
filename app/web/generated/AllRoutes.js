/*global */
/**
 *
 * @flow
 */

"use strict";

import type {InternalRouteType, InternalRouteListType} from '~/app/lib/InternalRouteType';
import type {Element as ReactElement} from 'react';

const React = require('react');
// will generate this eventually...
// route.key || route.name.substr(1).replace('/', '-')

module.exports = [
  {
    key: 'sample',
    name: 'Sample',
    path: '/',
    route: '/',
    action: (): ReactElement<*> => {
      const SamplePage = require('~/app/web/pages/SamplePage');
      return (
        <SamplePage />
      );
    },
  },{
    key: 'cities',
    name: 'Cities',
    path: '/cities/',
    route: '/cities/:page',
    action: (): ReactElement<*> => {
      const CitiesPage = require('~/app/web/pages/CitiesPage');
      return (
        <CitiesPage />
      );
    },
  },{
    key: 'city',
    name: 'City',
    path: '/city/',
    route: '/city/:state/:cityname',
    action: (): ReactElement<*> => {
      const CityPage = require('~/app/web/pages/CityPage');
      return (
        <CityPage />
      );
    },
  },{
    key: 'not-found',
    name: 'ErrorNotFound',
    path: '/*',
    route: '/*',
    action: (): ReactElement<*> => {
      const ErrorNotFoundPage = require('~/app/web/pages/ErrorNotFoundPage');
      return (
        <ErrorNotFoundPage />
      );
    },
  },
]
