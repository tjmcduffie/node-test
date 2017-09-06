/*global SyntheticEvent*/
/**
 *
 * @flow
 */

"use strict";

import type {Node as ReactNode} from 'react';

type ButtonStyles = 'green'|'grey';

type Props = {
  children: string,
  href: string,
  onClick?: (e: SyntheticEvent<>) => void,
  theme: ButtonStyles,
};

const Link = require('~/app/web/components/global/Link');
const React = require('react');

const cx = require('classNames');
const style = require('~/app/static_src/css/Button.css');

class Button extends React.PureComponent<Props> {
  props: Props;

  static theme: {[string]: ButtonStyles} = {
    GREEN: 'green',
    GREY: 'grey',
  };

  render(): ReactNode {
    const {
      children,
      href,
      onClick,
      theme,
      ...otherProps
    } = this.props;

    return (
      <Link
        {...otherProps}
        className={cx({
          [style.root]: true,
          [style.green]: theme === Button.theme.GREEN,
          [style.grey]: theme === Button.theme.GREY,
        })}
        href={href}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
}

module.exports = Button;
