/*global */
/**
 *
 * @flow
 */

"use strict";

import type {BrowserHistory} from '~/app/lib/util/browserHistory';
import type {Element as ReactElement} from 'react';

const BaseError = require('~/app/lib/BaseError');
const browserHistory = require('~/app/lib/util/browserHistory')();
const AllRoutes = require('~/app/web/generated/AllRoutes');
const ErrorNotFoundPage = require('~/app/web/pages/ErrorNotFoundPage');
const Error500Page = require('~/app/web/pages/Error500Page');
const React = require('react');
const Router = require('routr');

const cx = require('classNames');

class ContentRouterError extends BaseError {
  status: ?number;
}

class ContentRouter extends React.Component {
  state: {
    isLoading: boolean,
    page: ReactElement<*>,
  };
  _history: ?BrowserHistory;
  _router: Router;
  _unlistenToHistory: ?() => void;

  constructor() {
    super();
    if (!browserHistory) {
      throw new ContentRouterError('history object is unavailable');
    }
    this._history = browserHistory;
    this._router = new Router(AllRoutes);
    this._unlistenToHistory = this._history.listen(this._handleHistoryChange);
    this.state = {
      isLoading: false,
      page: this._resolve(browserHistory.location),
    };
  }

  _handleHistoryChange = (uri: Location): void => {
    this.setState({page: this._resolve(uri)});
  };

  _resolve(
    uri: Location,
  ): ReactElement<*> {
    const route = this._router.getRoute(uri.pathname);
    let page;

    if (route) {
      const {config: {action}} = route
      try {
        page = action(route.params, route.query);
      } catch (e) {
        if (e instanceof ContentRouterError) {
          page = <ErrorNotFoundPage />;
        } else {
          page = <Error500Page />;
        }
        console.error(e);
      }
    } else {
      const error = new ContentRouterError('Not found');
      error.status = 404;
      page = <ErrorNotFoundPage />;
    }

    return page;
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
