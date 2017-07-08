/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Element as ReactElement} from 'react';

const Body = require('~/app/web/components/layout/Body');
const Footer = require('~/app/web/components/layout/Footer');
const Header = require('~/app/web/components/layout/Header');
const IdEnum = require('~/app/lib/IdEnum');
const React = require('react');

module.exports = function Main(props: {
  children?: Array<ReactElement<*>> | ReactElement<*>,
}): ReactElement<*> {
  return (
    <div>
      <div id={IdEnum.HEADER}>
        <Header />
      </div>
      <Body id={IdEnum.CONTENT}>
        {props.children}
      </Body>
      <div id={IdEnum.FOOTER}>
        <Footer />
      </div>
    </div>
  );
}
