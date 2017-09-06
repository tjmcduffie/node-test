/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Node as ReactNode} from 'react';

type State = {
  isExpanded: boolean,
};

const Block = require('~/app/web/components/global/Block');
const MainNav = require('~/app/web/components/layout/MainNav');
const React = require('react');

const cx = require('classNames');
const style = require('~/app/static_src/css/Header.css');
const styleGlobal = require('~/app/static_src/css/global.css');
require('~/app/static_src/css/normalize.css');

class Header extends React.PureComponent<{}, State> {
  state = {
    isExpanded: false,
  };

  _handlePattyClick = (): void => {
    this.setState({isExpanded: !this.state.isExpanded});
  }

  render(): ReactNode {
    return (
      <Block
        className={style.block}
        classNameInner={style.blockInner}
        theme={Block.theme.NONE}
      >
        <div
          className={cx({
            [style.root]: true,
            [style.expanded]: this.state.isExpanded,
          })}
        >
          <header className={style.header}>
            <h1 className={style.title}>Title with more WOW</h1>
          </header>
          <div className={style.hamburger}>
            <span
              className={style.patty}
              onClick={this._handlePattyClick}
            ></span>
          </div>
          <MainNav
            className={cx({
              [style.mainNav]: true,
              [styleGlobal.hidden]: !this.state.isExpanded,
            })}
          />
        </div>
      </Block>
    );
  }
}

module.exports = Header;
