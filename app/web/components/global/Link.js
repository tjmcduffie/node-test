/*global SyntheticEvent*/
/**
 *
 * @flow
 */

"use strict";

import type {BrowserHistory} from '~/app/lib/util/browserHistory';
import type {Node as ReactNode} from 'react';

type Props = {
  children?: Array<ReactNode> | ReactNode,
  className?: string,
  href: string,
  isExternal?: boolean,
  onClick?: (e: SyntheticEvent<>) => void,
};

const BaseError = require('~/app/lib/BaseError');
const browserHistory = require('~/app/lib/util/browserHistory');
const React = require('react');
const URIParser = require('~/app/lib/util/URIParser');

class LinkError extends BaseError {}

class Link extends React.PureComponent<Props> {
  _history: ?BrowserHistory;
  props: Props;

  constructor(props: *) {
    super(props);
    this._history = browserHistory;
  }

  _handleClick = (e: SyntheticEvent<>): void => {
    if (this.props.isExternal) {
      // handle the link normally.
      return;
    }

    e.preventDefault();
    this.props.onClick && this.props.onClick();

    if (typeof e.currentTarget.href !== 'string') {
      return;
    }
    const parsedURI = new URIParser(e.currentTarget.href);
    this._history && this._history.push({
      pathname: parsedURI.getPathname(),
      search: parsedURI.getSearch(),
    });
  }

  render() {
    return (
      <a
        className={this.props.className}
        href={this.props.href}
        onClick={this._handleClick}
      >
        {this.props.children}
      </a>
    );
  }
}

module.exports = Link;
