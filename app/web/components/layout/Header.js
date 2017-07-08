/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Element as ReactElement} from 'react';

type State = {
  isExpanded: boolean,
};

const MainNav = require('~/app/web/components/layout/MainNav');
const React = require('react');

const cx = require('classNames');
const styles = require('~/app/static_src/css/Header.css');
const stylesGlobal = require('~/app/static_src/css/global.css');

class Header extends React.PureComponent {
  state: State = {
    isExpanded: false,
  };

  _handlePattyClick = (): void => {
    this.setState({isExpanded: !this.state.isExpanded});
  }

  render(): ReactElement<*> {
    return (
      <div
        className={cx({
          [styles.root]: true,
          [styles.expanded]: this.state.isExpanded,
        })}
      >
        <header className={styles.header}>
          <h1 className={styles.title}>Title with more WOW</h1>
        </header>
        <div className={styles.hamburger}>
          <span
            className={styles.patty}
            onClick={this._handlePattyClick}
          ></span>
        </div>
        <MainNav
          className={cx({
            [stylesGlobal.hidden]: !this.state.isExpanded,
          })}
        />
      </div>
    );
  }
}

module.exports = Header;
