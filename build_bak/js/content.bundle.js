webpackJsonp([0],{

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*global*/
// probably better as an immutable map... this will do for now
const GLOBAL_CONST_KEY = '__initialData__';

class DataCache {
  static get(key) {
    if (DataCache._store.has(key)) {
      return DataCache._store.get(key);
    }

    return null;
  }

  static set(key, value) {
    DataCache._store.set(key, value);
  }

  static hydrateFromWindowGlobals() {
    const initialData = window && window[GLOBAL_CONST_KEY] || {};

    if (initialData) {
      Object.keys(initialData).forEach(key => DataCache.set(key, initialData[key]));
    }
  }

}

_defineProperty(DataCache, "_store", new Map());

module.exports = DataCache;

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*global */


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const BaseError = __webpack_require__(3);

const browserHistory = __webpack_require__(29)();

const DataCache = __webpack_require__(22);

const ErrorNotFoundPage = __webpack_require__(80);

const Error500Page = __webpack_require__(79);

const LoadingScreen = __webpack_require__(74);

const React = __webpack_require__(0);

const router = __webpack_require__(33);

const {
  NotFoundError
} = __webpack_require__(68);

class ContentRouterError extends BaseError {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "status", void 0);
  }

}

class ContentRouter extends React.Component {
  constructor() {
    super();

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "_history", void 0);

    _defineProperty(this, "_router", void 0);

    _defineProperty(this, "_unlistenToHistory", void 0);

    _defineProperty(this, "_handleHistoryChange", uri => {
      this.setState({
        isLoading: true
      });

      this._resolve(uri);
    });

    if (!browserHistory) {
      throw new ContentRouterError('history object is unavailable');
    }

    this._history = browserHistory;
    this._router = router;
    this.state = {
      isLoading: false,
      page: React.createElement("div", null)
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

  _resolve(uri, isInitial) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const route = _this._router.getRoute(uri.pathname);

      let page;

      try {
        if (route) {
          if (isInitial) {
            page = _this._resolveWithInitialData(route);
          } else {
            page = yield _this._resolveWithAPIData(route);
          }
        } else {
          throw new NotFoundError();
        }
      } catch (e) {
        console.error(e);

        if (e instanceof NotFoundError) {
          page = React.createElement(ErrorNotFoundPage, null);
        } else {
          page = React.createElement(Error500Page, null);
        }
      }

      _this.setState({
        page,
        isLoading: false
      });
    })();
  }

  _resolveWithInitialData(route) {
    const {
      config: {
        Component
      }
    } = route;
    const data = DataCache.get(Component.name);
    return React.createElement(Component, data);
  }

  _resolveWithAPIData(route) {
    return new Promise((resolve, reject) => {
      const {
        config: {
          Component,
          fetchData
        },
        params,
        query
      } = route; // need to wrap each of the arguments here in new objects to make sure all
      // descriptor props are set appropriately.

      const mergedParams = Object.assign({}, query, params);
      fetchData(mergedParams).then(data => resolve(React.createElement(Component, data))).catch(e => reject(e));
    });
  }

  render() {
    const {
      isLoading,
      page
    } = this.state;
    return React.createElement("div", null, page, React.createElement(LoadingScreen, {
      isVisible: isLoading
    }));
  }

}

module.exports = ContentRouter;

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*global */


const React = __webpack_require__(0);

const cx = __webpack_require__(2);

const styles = __webpack_require__(87);

const year = new Date().getFullYear();

module.exports = function Footer() {
  return React.createElement("footer", {
    className: cx(styles.root)
  }, React.createElement("ul", {
    className: cx(styles.list)
  }, React.createElement("li", null, "All original content \xA9 ", year, " Tim McDuffie unless otherwise noted.")));
};

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*global */


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const BaseError = __webpack_require__(3);

class ForbiddenError extends BaseError {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "status", 403);
  }

}

class NotFoundError extends BaseError {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "status", 404);
  }

}

class SystemError extends BaseError {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "status", 500);
  }

}

module.exports = {
  ForbiddenError,
  NotFoundError,
  SystemError
};

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*global */


const ContentRouter = __webpack_require__(44);

const DataCache = __webpack_require__(22);

const Footer = __webpack_require__(45);

const IdEnum = __webpack_require__(11);

const React = __webpack_require__(0);

const ReactDOM = __webpack_require__(7);

const runWhenReady = __webpack_require__(10);

runWhenReady(() => {
  DataCache.hydrateFromWindowGlobals();
  ReactDOM.render(React.createElement(ContentRouter, null), document.getElementById(IdEnum.CONTENT));
  ReactDOM.render(React.createElement(Footer, null), document.getElementById(IdEnum.FOOTER));
});

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*global */


const React = __webpack_require__(0);

const cx = __webpack_require__(2);

const style = __webpack_require__(89);

const LoadingScreen = props => {
  return React.createElement("div", {
    className: cx({
      [style.root]: true,
      [style.isLoading]: props.isVisible,
      [style.isLoadingComplete]: !props.isVisible
    })
  }, React.createElement("div", {
    className: cx(style.progress)
  }, React.createElement("div", {
    className: cx(style.indeterminate)
  })));
};

module.exports = LoadingScreen;

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*global */


const React = __webpack_require__(0);

const Error500Page = () => {
  return React.createElement("article", {
    className: "error-not-found-page"
  }, React.createElement("div", null, React.createElement("div", {
    className: "block row"
  }, React.createElement("div", {
    className: "md-col-8 lg-col-5"
  }, React.createElement("h2", null, "Oh poop."), React.createElement("p", null, "Something went wrong.")))));
};

module.exports = Error500Page;

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*global */

/**
 * 
 * //flow
 */


const React = __webpack_require__(0);

const ErrorNotFoundPage = () => {
  return React.createElement("article", {
    className: "error-not-found-page"
  }, React.createElement("div", null, React.createElement("div", {
    className: "block row"
  }, React.createElement("div", {
    className: "md-col-8 lg-col-5"
  }, React.createElement("h2", null, "4-oh-4"), React.createElement("p", null, "Not found")))));
};

module.exports = ErrorNotFoundPage;

/***/ }),

/***/ 87:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"root":"Footer--root--HWclC","list":"Footer--list--3oI84 grid--block--2emKJ"};

/***/ }),

/***/ 89:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"root":"LoadingScreen--root--1klay","isLoadingComplete":"LoadingScreen--isLoadingComplete--imT6y","progress":"LoadingScreen--progress--3zxKl","indeterminate":"LoadingScreen--indeterminate--2TGGy","indeterminate-short":"LoadingScreen--indeterminate-short--3E-N8"};

/***/ })

},[72]);