/*global */
/**
 *
 * @flow
 */

"use strict";

const ContentRouter = require('~/app/web/components/global/ContentRouter');
const DataCache = require('~/app/lib/util/DataCache');
const IdEnum = require('~/app/web/components/IdEnum');
const React = require('react');
const ReactDOM = require('react-dom');
const runWhenReady = require('~/app/lib/util/runWhenReady');

runWhenReady(() => {
  DataCache.hydrateFromWindowGlobals();
  ReactDOM.render((<ContentRouter />), document.getElementById(IdEnum.CONTENT));
});
