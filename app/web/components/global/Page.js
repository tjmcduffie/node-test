/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Element as ReactElement} from 'react';

const Block = require('~/app/web/components/global/Block');
const React = require('react');

const cx = require('classNames');
const style = require('~/app/static_src/css/Page.css');

const Page = (props: {
  children: Block<*>,
  className?: string,
}): ReactElement<*> => {
  return (
    <div className={cx(style.root, props.className)}>
      {props.children}
    </div>
  );
};

module.exports = Page;
