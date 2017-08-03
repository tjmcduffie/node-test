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
const LoadingScreen = require('~/app/web/components/global/LoadingScreen');
const React = require('react');
const router = require('~/app/web/routes/Router');
const {NotFoundError} = require('~/app/lib/ServerErrors');

class ContentRouterError extends BaseError {
  status: ?number;
}

class ContentRouter extends React.Component {
  state: {
    isLoading: boolean,
    page: ?ReactElement<*>,
  };
  _history: BrowserHistory;
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
      page: (<div />),
    };
  }

  componentWillMount() {
    if (this._history) {
      this._unlistenToHistory = this._history.listen(this._handleHistoryChange);
    }
  }

  componentDidMount() {
    this._resolve(this._history.location, true);
  }

  componentWillUnount() {
    this._unlistenToHistory && this._unlistenToHistory();
  }

  _handleHistoryChange = (uri: Location): void => {
    this.setState({isLoading: true});
    this._resolve(uri);
  };

  async _resolve(
    uri: Location,
    isInitial?: boolean,
  ): Promise<void> {
    const route = this._router.getRoute(uri.pathname);
    let page;
    try {
      if (route) {
        if (isInitial) {
          page = this._resolveWithInitialData(route);
        } else {
          page = await this._resolveWithAPIData(route);
        }
      } else {
        throw new NotFoundError();
      }
    } catch (e) {
      if (e instanceof NotFoundError) {
        page = (<ErrorNotFoundPage />);
      } else {
        page = (<Error500Page />);
      }
    }

    this.setState({
      page,
      isLoading: false,
    });
  }

  _resolveWithInitialData(route: Route): ReactElement<*> {
    const {config: {Component}} = route;
    const data = DataCache.get(Component.name);
    return <Component {...data} />;
  }

  _resolveWithAPIData(route: Route): Promise<ReactElement<*>> {
    return new Promise((resolve, reject) => {
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
      fetchData(mergedParams)
        .then((data: Object) => {
          resolve((<Component {...data} />));
        })
        .catch((e: Error) => {
          reject(e);
        });
    });
  }

  render(): ReactElement<*> {
    const {
      isLoading,
      page,
    } = this.state;
    return (
      <div>
        {page}
        <LoadingScreen isVisible={isLoading} />
      </div>
    );
  }
}

module.exports = ContentRouter;
