/*global */
/**
 *
 * //flow
 */

"use strict";

const Header = require('~/app/web/components/layout/Header');
const IdEnum = require('~/app/lib/IdEnum');
const React = require('react');
const ReactDOM = require('react-dom');
const runWhenReady = require('~/app/lib/util/runWhenReady');

runWhenReady(() => {
  ReactDOM.render((<Header />), document.getElementById(IdEnum.HEADER));
});
