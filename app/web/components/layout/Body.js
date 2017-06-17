/*global */
/**
 * 
 * //flow
 */

"use strict";

const React = require('react');

import type {Element as ReactElement} from 'react';

module.exports = function Body(props: {
  children?: [ReactElement<*>] | ReactElement<*>,
  id: string,
}) {
  return (
    <main id={props.id}>
      {props.children}
    </main>
  );
}
