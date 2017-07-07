/*global */
/**
 *
 * @flow
 */

"use strict";

const MainNav = require('~/app/web/components/layout/MainNav');
const React = require('react');

module.exports = function Header() {
  return (
    <div className="header">
      <div className="block row">
        <header className="primary sm-col-10 lg-col-6">
          <h1>Tim McDuffie WOW</h1>
        </header>
        <div className="hamburger sm-last lg-hidden">
          <span className="patty"></span>
        </div>
        <MainNav />
      </div>
    </div>
  );
}
