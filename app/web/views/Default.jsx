/*global */
/**
 *
 * @flow
 */

"use strict";

const React = require('react');

import type {Element as ReactElement} from 'react';

module.exports = function Default(props: {
  children?: Array<ReactElement<*>> | ReactElement<*>,
  title: string,
}): ReactElement<*> {
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
        <script src="/js/inline.bundle.js"></script>
        <script src="/js/header.bundle.js"></script>
        <script src="/js/content.bundle.js"></script>
      </body>
    </html>
  );
}
