/*global */
/**
 *
 * @flow
 */

"use strict";

import type {
  ComponentType as ReactComponentType,
  Node as ReactNode,
} from 'react';

export type pageRenderer = (params: Object, query: Object) => ReactNode;

const React = require('react');

const renderPage = (ComponentClass: ReactComponentType<*>): Function => {
  return (params: Object, query: Object): ReactNode => {
    return (
      <ComponentClass
        {...params}
        {...query}
      />
    );
  }
}

module.exports = renderPage
