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
const browserHistory = require('~/app/lib/util/browserHistory')();
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
    if (typeof e.currentTarget.href !== 'string') {
      throw new LinkError('Link doesn\'t have an href to parse');
    }
    const parsedURI = new URIParser(e.currentTarget.href);
    // flow complains without this additional check. lame.
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
        onClick={this.props.onClick || this._handleClick}
      >
        {this.props.children}
      </a>
    );
  }
}

module.exports = Link;
