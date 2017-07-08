/*global */
/**
 *
 * //flow
 */

"use strict";

const ContentRouter = require('~/app/web/components/layout/ContentRouter');
const IdEnum = require('~/app/lib/IdEnum');
const React = require('react');
const ReactDOM = require('react-dom');
const runWhenReady = require('~/app/lib/util/runWhenReady');

runWhenReady(() => {
  ReactDOM.render((<ContentRouter />), document.getElementById(IdEnum.CONTENT));
});
