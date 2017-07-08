/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Element as ReactElement} from 'react';

const React = require('react');

const cx = require('classNames');
const styles = require('~/app/static_src/css/Footer.css');

const year = (new Date()).getFullYear();

module.exports = function Footer(): ReactElement<*> {
  return (
    <footer className={cx(styles.root)}>
      <ul className={cx(styles.list)}>
        <li>
          All original content &copy; {year} Tim McDuffie unless otherwise
          noted.
        </li>
      </ul>
    </footer>
  );
}
