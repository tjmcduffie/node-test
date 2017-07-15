/*global */
/**
 *
 * //flow
 */

"use strict";

const React = require('react');
// will generate this eventually...
// route.key || route.name.substr(1).replace('/', '-')

export type InternalRouteType = {
  key: string,
  module: string,
  name: string,
  path: string,
};

export type InternalRouteListType = Array<InternalRouteType>;

module.exports = [
  {
    key: 'sample',
    module: require('~/app/web/pages/SamplePage'),
    modulePath: '~/app/web/pages/SamplePage',
    name: 'Sample',
    path: '/',
    action: () => {
      const SamplePage = require('~/app/web/pages/SamplePage');
      return (
        <SamplePage />
      );
    },
  },{
    key: 'city',
    module: require('~/app/web/pages/CityPage'),
    modulePath: '~/app/web/pages/CityPage',
    name: 'City',
    path: '/city/:state/:name',
    action: () => {
      const CityPage = require('~/app/web/pages/CityPage');
      return (
        <CityPage />
      );
    },
  },{
    key: 'cities',
    module: require('~/app/web/pages/CitiesPage'),
    modulePath: '~/app/web/pages/CitiesPage',
    name: 'Cities',
    path: '/cities/:page',
    action: () => {
      const CitiesPage = require('~/app/web/pages/CitiesPage');
      return (
        <CitiesPage />
      );
    },
  },{
    key: 'not-found',
    module: require('~/app/web/pages/ErrorNotFoundPage'),
    modulePath: '~/app/web/pages/ErrorNotFoundPage',
    name: 'Not Found',
    path: '/not-found',
    action: () => {
      const ErrorNotFoundPage = require('~/app/web/pages/ErrorNotFoundPage');
      return (
        <ErrorNotFoundPage />
      );
    },
  },
]
