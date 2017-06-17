/*global */
/**
 *
 * //flow
 */

"use strict";

const runWhenReady = require('~/app/lib/util/runWhenReady');
const MainNav = require('~/app/web/components/layout/MainNav');
const ReactDOM = require('react-dom');

runWhenReady(() => {
  const container = document.createElement('div');
  document.appendChild(container);
  ReactDOM.render((<Header />), document.getElementById('header-container'));
});
