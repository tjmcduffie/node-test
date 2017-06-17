/*global */
/**
 * 
 * //flow
 */

"use strict";

const Body = require('~/app/web/components/layout/Body');
const Footer = require('~/app/web/components/layout/Footer');
const Header = require('~/app/web/components/layout/Header');
const IdEnum = require('~/app/lib/IdEnum');
const React = require('react');

module.exports = function Main(props) {
  return (
    <div id={IdEnum.DEFAULT_LAYOUT}>
      <div id={IdEnum.HEADER_CONTAINER}>
        <Header id={IdEnum.HEADER} />
      </div>
      <Body id={IdEnum.CONTENT}>
        {props.children}
      </Body>
      <Footer id={IdEnum.FOOTER} />
    </div>
  );
}
