/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Element as ReactElement} from 'react';

const React = require('react');
const assetManifest = require('~/generated/asset-manifest.json');

const styles = [];
const scripts = [];

Object.values(assetManifest).forEach((asset: string) => {
  if (asset.substring(0, 3) === 'css') {
    styles.push(asset);
  } else if (asset.substring(0, 2) === 'js') {
    scripts.push(asset);
  }
});

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
        {styles.map(path => (<link href={`/${path}`} key={path} rel="stylesheet" />))}
      </head>
      <body>
        {props.children}
        <script dangerouslySetInnerHTML={{__html: initialdataJSON}} />
        <script dangerouslySetInnerHTML={{__html: preloadedDataString}} />
        {scripts.map(path => (<script key={path} src={`/${path}`}></script>))}
      </body>
    </html>
  );
}
