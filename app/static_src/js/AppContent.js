/*global */
/**
 *
 * @flow
 */

"use strict";

const ContentRouter = require('~/app/web/components/global/ContentRouter');
const Footer = require('~/app/web/components/layout/Footer');
const IdEnum = require('~/app/web/components/IdEnum');
const React = require('react');
const ReactDOM = require('react-dom');
const runWhenReady = require('~/app/lib/util/runWhenReady');

runWhenReady(() => {
  ReactDOM.render((<ContentRouter />), document.getElementById(IdEnum.CONTENT));
  ReactDOM.render((<Footer />), document.getElementById(IdEnum.FOOTER));
});
