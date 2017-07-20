/*global ReactClass*/
/**
 *
 * @flow
 */

"use strict";

import type {Element as ReactElement} from 'react';

export type pageRenderer = (params: Object, query: Object) => ReactElement<*>;

const React = require('react');

const renderPage = (ComponentClass: ReactClass<*>): Function => {
  return (params: Object, query: Object): ReactElement<*> => {
    return (
      <ComponentClass
        {...params}
        {...query}
      />
    );
  }
}

module.exports = renderPage
