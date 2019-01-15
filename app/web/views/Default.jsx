/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Element as ReactElement} from 'react';

const React = require('react');

module.exports = function Default(props: {
  children?: Array<ReactElement<*>> | ReactElement<*>,
  title: string,
  initialData: string,
  preloadData: Object,
}): ReactElement<*> {
  const initialdataJSON = `window.__initialData__ = ${props.initialData}`;
  const preloadedDataJSON =
    JSON.stringify(props.preloadData, null, 2).replace(/</g, '\\u003c');
  const preloadedDataString = `window.__preloadedData__ = ${preloadedDataJSON}`;
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta
          content="width=device-width, initial-scale=1.0"
          name="viewport"
        />
        <title>
          {props.title}
        </title>
        <link href="/css/inline.bundle.css" rel="stylesheet" />
        <link href="/css/header.bundle.css" rel="stylesheet" />
        <link href="/css/content.bundle.css" rel="stylesheet" />
      </head>
      <body>
        {props.children}
        <script dangerouslySetInnerHTML={{__html: initialdataJSON}} />
        <script dangerouslySetInnerHTML={{__html: preloadedDataString}} />
        <script src="/js/inline.bundle.js"></script>
        <script src="/js/header.bundle.js"></script>
        <script src="/js/content.bundle.js"></script>
      </body>
    </html>
  );
}
