/*global */
/**
 *
 * //flow
 */

"use strict";

const ContentRouter = require('~/app/web/components/layout/ContentRouter');
const React = require('react');
const ReactDOM = require('react-dom');
const runWhenReady = require('~/app/lib/util/runWhenReady');

runWhenReady(() => {
  ReactDOM.render((<ContentRouter />), document.getElementById('content'));
});
