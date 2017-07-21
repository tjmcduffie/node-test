/*global */
/**
 *
 * @flow
 */

"use strict";

import type {BrowserHistory} from '~/app/lib/util/browserHistory';
import type {InternalRouteType} from '~/app/lib/InternalRouteType';
import type {Element as ReactElement} from 'react';

type Route = {
  name: string,
  config: {
    path: string,
  } & InternalRouteType,
  options: Object,
  params: Object,
  query: Object,
};

const BaseError = require('~/app/lib/BaseError');
const browserHistory = require('~/app/lib/util/browserHistory')();
const DataCache = require('~/app/lib/util/DataCache');
const ErrorNotFoundPage = require('~/app/web/pages/ErrorNotFoundPage');
const Error500Page = require('~/app/web/pages/Error500Page');
const React = require('react');
const router = require('~/app/web/routes/Router');
const {NotFoundError} = require('~/app/lib/ServerErrors');

const cx = require('classNames');

class ContentRouterError extends BaseError {
  status: ?number;
}

class ContentRouter extends React.Component {
  state: {
    isLoading: boolean,
    page: ?ReactElement<*>,
  };
  _history: ?BrowserHistory;
  _router: router;
  _unlistenToHistory: ?() => void;

  constructor() {
    super();
    if (!browserHistory) {
      throw new ContentRouterError('history object is unavailable');
    }
    this._history = browserHistory;
    this._router = router;
    this.state = {
      isLoading: false,
      page: this._resolve(browserHistory.location, true),
    };
  }

  componentWillMount() {
    if (this._history) {
      this._unlistenToHistory = this._history.listen(this._handleHistoryChange);
    }
  }

  componentWillUnount() {
    this._unlistenToHistory && this._unlistenToHistory();
  }

  _handleHistoryChange = (uri: Location): void => {
    this._resolve(uri, false);
  };

  // @TODO convert this to use async/await rather than calling through to one
  // sync and one async method.
  _resolve(uri: Location, isInitial: boolean): ?ReactElement<*> {
    const route = this._router.getRoute(uri.pathname);
    if (route) {
      if (isInitial) {
        return this._resolveWithInitialData(route);
      } else {
        this._resolveWithAPIData(route);
      }
    } else {
      const error = new ContentRouterError('Not found');
      error.status = 404;
      const page = (
        <ErrorNotFoundPage />
      );
      if (isInitial) {
        return page;
      } else {
        this.setState({page});
      }
    }
  }

  _resolveWithInitialData(route: Route): ReactElement<*> {
    const {config: {Component}} = route;
    const data = DataCache.get(Component.name);
    return <Component {...data} />;
  }

  _resolveWithAPIData(route: Route): void {
    const {
      config: {
        Component,
        fetchData,
      },
      params,
      query,
    } = route;
    // need to wrap each of the arguments here in new objects to make sure all
    // descriptor props are set appropriately.
    const mergedParams = Object.create(
      Object.create(query),
      Object.create(params),
    );
    this.setState(
      {isLoading: true},
      () => {
        fetchData(mergedParams)
          .then((data: Object) => {
            this.setState({
              isLoading: false,
              page: (
                <Component {...data} />
              ),
            });
          })
          .catch((e: Error) => {
            let page;
            if (e instanceof NotFoundError) {
              page = <ErrorNotFoundPage />;
            } else {
              page = <Error500Page />;
            }
            this.setState({
              isLoading: false,
              page,
            });
          });
      },
    );
  }

  render(): ReactElement<*> {
    const {
      isLoading,
      page,
    } = this.state;
    return (
      <div
        className={cx({
          'isLoading': isLoading,
          'loadingComplete': !isLoading,
        })}
      >
        {page}
        <div className={cx('screen')}>
          <div className={cx('loader')} />
        </div>
      </div>
    );
  }
}

module.exports = ContentRouter;
