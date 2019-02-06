/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Element as ReactElement} from 'react';

const Footer = require('~/app/web/components/layout/Footer');
const Header = require('~/app/web/components/layout/Header');
const IdEnum = require('~/app/web/components/IdEnum');
const React = require('react');

module.exports = function Main(props: {
  children?: Array<ReactElement<*>> | ReactElement<*>,
}): ReactElement<*> {
  return (
    <main id={IdEnum.CONTENT}>
      <Header />
      {props.children}
      <Footer />
    </main>
  );
}
