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
    key: 'home',
    module: require('~/app/web/components/pages/HomePage'),
    modulePath: '~/app/web/components/pages/HomePage',
    name: 'Home',
    path: '/',
    action: () => {
      const HomePage = require('~/app/web/components/pages/HomePage');
      return (
        <HomePage />
      );
    },
  },{
    key: 'about',
    module: require('~/app/web/components/pages/ErrorNotFoundPage'),
    modulePath: '~/app/web/components/pages/ErrorNotFoundPage',
    name: 'About',
    path: '/about',
    action: () => {
      const ErrorNotFoundPage = require('~/app/web/components/pages/ErrorNotFoundPage');
      return (
        <ErrorNotFoundPage />
      );
    },
  },{
    key: 'work',
    module: require('~/app/web/components/pages/ErrorNotFoundPage'),
    modulePath: '~/app/web/components/pages/ErrorNotFoundPage',
    name: 'Work',
    path: '/work',
    action: () => {
      const ErrorNotFoundPage = require('~/app/web/components/pages/ErrorNotFoundPage');
      return (
        <ErrorNotFoundPage />
      );
    },
  },{
    key: 'contact',
    module: require('~/app/web/components/pages/ContactPage'),
    modulePath: '~/app/web/components/pages/ContactPage',
    name: 'Contact',
    path: '/contact',
    action: () => {
      const ContactPage = require('~/app/web/components/pages/ContactPage');
      return (
        <ContactPage />
      );
    },
  },
]
