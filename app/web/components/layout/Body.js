/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Element as ReactElement} from 'react';

const React = require('react');

module.exports = function Body(props: {
  children?: Array<ReactElement<*>> | ReactElement<*>,
  id: string,
}): ReactElement<*> {
  return (
    <main id={props.id}>
      {props.children}
    </main>
  );
}
