/*global SyntheticEvent*/
/**
 *
 * @flow
 */

"use strict";

import type {BrowserHistory} from '~/app/lib/util/browserHistory';
import type {InternalRouteType} from '~/app/web/generated/NavRoutes';
import type {Element as ReactElement} from 'react';

const BaseError = require('~/app/lib/BaseError');
const browserHistory = require('~/app/lib/util/browserHistory')();
const React = require('react');
const URIParser = require('~/app/lib/util/URIParser');

class InternalLinkError extends BaseError {}

class InternalLink extends React.PureComponent {
  _history: ?BrowserHistory;
  props: {
    children?: Array<ReactElement<*>> | ReactElement<*>,
    href: string,
    onClick?: (e: SyntheticEvent) => void,
    route: InternalRouteType,
  }

  constructor(props: *) {
    super(props);
    this._history = browserHistory;
  }

  _handleClick = (e: SyntheticEvent): void => {
    if (!this._history) {
      // handle the link normally.
      return;
    }

    e.preventDefault();
    if (typeof e.currentTarget.href !== 'string') {
      throw new InternalLinkError('Link doesn\'t have an href to parse');
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
        href={this.props.href}
        onClick={this._handleClick}
      >
        {this.props.children}
      </a>
    );
  }
}

module.exports = InternalLink;
