/*global */
/**
 *
 * @flow
 */

"use strict";

import type {BrowserHistory} from '~/app/lib/util/browserHistory';
import type {InternalRouteListType} from '~/app/lib/InternalRouteType';
import type {Element as ReactElement} from 'react';

const BaseError = require('~/app/lib/BaseError');
const browserHistory = require('~/app/lib/util/browserHistory')();
const AllRoutes = require('~/app/web/generated/AllRoutes');
const pathToRegex = require('path-to-regexp');
const React = require('react');

class ContentRouterError extends BaseError {
  status: ?number;
}

class ContentRouter extends React.Component {
  state: {
    page: ReactElement<*>,
  };
  _history: ?BrowserHistory;
  _unlistenToHistory: ?() => void;

  constructor() {
    super();
    if (!browserHistory) {
      throw new ContentRouterError('history object is unavailable');
    }
    this._history = browserHistory;
    this._unlistenToHistory = this._history.listen(this._handleHistoryChange);
    this.state = {
      page: this._routeUriToPage(browserHistory.location),
    };
  }

  _routeUriToPage = (location: Location): ReactElement<*> => {
    return this._resolve(AllRoutes, location);
  };

  _handleHistoryChange = (location: Location): void => {
    const page = this._routeUriToPage(location);
    this.setState({page});
  };

  _matchURI(path: string, uri: string): ?Object {
    const keys = [];
    const pattern = pathToRegex(path, keys);
    const match = pattern.exec(uri);
    if (!match) {
      return null;
    }
    const params = Object.create(null);
    for (let i = 1; i < match.length; i++) {
      params[keys[i - 1].name] =
        match[i] !== undefined ? match[i] : undefined;
    }
    return params;
  }

  _resolve(
    routes: InternalRouteListType,
    context: Location,
  ): ReactElement<*> {
    let result;
    for (const route of routes) {
      const uri = context.error ? '/error' : context.pathname;
      const params = this._matchURI(route.path, uri);
      if (!params) {
        continue;
      }

      result = route.action({context, params});
      if (result) {
        break;
      }
    }

    if (!result) {
      const error = new ContentRouterError('Not found');
      error.status = 404;
      throw error;
    }
    return result;
  }

  render(): ReactElement<*> {
    const {page} = this.state;
    return page;
  }
}

module.exports = ContentRouter;
