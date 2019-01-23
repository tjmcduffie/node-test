webpackJsonp([1],{

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*global */


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Block = __webpack_require__(4);

const MainNav = __webpack_require__(76);

const React = __webpack_require__(0);

const cx = __webpack_require__(2);

const style = __webpack_require__(88);

const styleGlobal = __webpack_require__(34);

__webpack_require__(94);

class Header extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isExpanded: false
    });

    _defineProperty(this, "_handlePattyClick", () => {
      this.setState({
        isExpanded: !this.state.isExpanded
      });
    });
  }

  render() {
    return React.createElement(Block, {
      className: style.block,
      classNameInner: style.blockInner,
      theme: Block.theme.NONE
    }, React.createElement("div", {
      className: cx({
        [style.root]: true,
        [style.expanded]: this.state.isExpanded
      })
    }, React.createElement("header", {
      className: style.header
    }, React.createElement("h1", {
      className: style.title
    }, "Title with more WOW")), React.createElement("div", {
      className: style.hamburger
    }, React.createElement("span", {
      className: style.patty,
      onClick: this._handlePattyClick
    })), React.createElement(MainNav, {
      className: cx({
        [style.mainNav]: true,
        [styleGlobal.hidden]: !this.state.isExpanded
      })
    })));
  }

}

module.exports = Header;

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*global */


const Header = __webpack_require__(46);

const IdEnum = __webpack_require__(11);

const React = __webpack_require__(0);

const ReactDOM = __webpack_require__(7);

const runWhenReady = __webpack_require__(10);

runWhenReady(() => {
  ReactDOM.render(React.createElement(Header, null), document.getElementById(IdEnum.HEADER));
});

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*global */


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Button = __webpack_require__(15);

const React = __webpack_require__(0);

const router = __webpack_require__(33);

const cx = __webpack_require__(2);

const styles = __webpack_require__(90);

const navLinks = [{
  name: 'Sample',
  path: router.makePath('SampleRoute')
}, {
  name: 'Locations',
  path: router.makePath('LocationsRoute', {
    page: 0
  })
}];

class MainNav extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "props", void 0);
  }

  render() {
    return React.createElement("nav", {
      className: cx(this.props.className, styles.root)
    }, React.createElement("ul", {
      className: styles.list
    }, navLinks.map((route, index) => {
      return React.createElement("li", {
        className: styles.item,
        key: index
      }, React.createElement(Button, {
        href: route.path,
        theme: Button.theme.GREEN
      }, route.name));
    })));
  }

}

module.exports = MainNav;

/***/ }),

/***/ 88:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"block":"Header--block--2kbJS","blockInner":"Header--blockInner--2JQyt","root":"Header--root--2dtwA","header":"Header--header--1Y5ml","title":"Header--title--2bRi6","hamburger":"Header--hamburger--JafSc","patty":"Header--patty--oPxZR","mainNav":"Header--mainNav--2AJHB","expanded":"Header--expanded--2Ba2w"};

/***/ }),

/***/ 90:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"root":"MainNav--root--3lRIo","list":"MainNav--list--2mAlC","item":"MainNav--item--3qjsN"};

/***/ }),

/***/ 94:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[73]);