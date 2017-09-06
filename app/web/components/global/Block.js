/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Node as ReactNode} from 'react';

type BlockStyles = 'green'|'grey'|'gridDark'|'gridLight'|'none'|'white';

type Props = {
  children: ReactNode | Array<ReactNode>,
  className?: string,
  classNameInner?: string,
  theme: BlockStyles,
};

const React = require('react');

const cx = require('classNames');
const style = require('~/app/static_src/css/Block.css');

class Block extends React.PureComponent<Props> {
  props: Props;

  static theme: {[string]: BlockStyles} = {
    GREEN: 'green',
    GREY: 'grey',
    GRID_DARK: 'gridDark',
    GRID_LIGHT: 'gridLight',
    NONE: 'none',
    WHITE: 'white',
  };

  render(): ReactNode {
    const {
      children,
      className,
      classNameInner,
      theme,
    } = this.props;

    return (
      <div
        className={cx(className, {
          [style.root]: true,
          [style.green]: theme === Block.theme.GREEN,
          [style.grey]: theme === Block.theme.GREY,
          [style.gridDark]: theme === Block.theme.GRID_DARK,
          [style.gridLight]: theme === Block.theme.GRID_LIGHT,
          [style.none]: theme === Block.theme.NONE,
          [style.white]: theme === Block.theme.WHITE,
        })}
      >
        <div className={cx(style.inner, classNameInner)}>
          {children}
        </div>
      </div>
    );
  }
}

module.exports = Block;
