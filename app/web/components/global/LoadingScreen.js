/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Element as ReactElement} from 'react';

const React = require('react');

const cx = require('classNames');
const style = require('~/app/static_src/css/LoadingScreen.css');

const LoadingScreen = (
  props: {
    isVisible: boolean,
  },
): ReactElement<*> => {
  return (
    <div
      className={cx({
        [style.root]: true,
        [style.isLoading]: props.isVisible,
        [style.isLoadingComplete]: !props.isVisible,
      })}
    >
      <div className={cx(style.progress)}>
        <div className={cx(style.indeterminate)} />
      </div>
    </div>
  );
};

module.exports = LoadingScreen;
