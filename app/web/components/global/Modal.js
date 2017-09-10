/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Node as ReactNode} from 'react';

type Props = {
  children?: Array<ReactNode> | ReactNode,
  isShown: boolean,
  onClose?: () => void,
  title: string,
};

type State = {
  isShown: boolean,
};

const React = require('react');

const cx = require('classNames');
const element = require('~/app/lib/util/element');
const style = require('~/app/static_src/css/Modal.css');



class Modal extends React.PureComponent<Props, State> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      isShown: props.isShown || false,
    };
  }

  componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.isShown !== this.props.isShown) {
      this.setState({isShown: nextProps.isShown});
    }
  }

  componentDidUpdate(prevProps: Props): void {
    if (!prevProps.isShown && this.props.isShown) {
      this._setFocus();
    }
  }

  _handleClose = (e: Event): void => {
    e.preventDefault();
    this.setState({isShown: false});
    this.props.onClose && this.props.onClose();
  }

  _handleKeyPress = (e: Event): void => {
    if (e.key === "Escape" || e.keyCode === 27) {
      this._handleClose(e);
    }
  }

  _setFocus = (): void => {
    const focusable = element.findTabbableChildren(this.refs.container);
    const first = focusable[0];
    console.log(focusable, first);
    if (first) {
      first.focus();
    }
  }

  render() {
    const modal =
      <div className={cx(style.screen)}>
        <div
          className={cx(style.container)}
          onKeyDown={this._handleKeyPress}
          ref="container"
        >
          <div className={cx(style.header)}>
            <header className={cx(style.heading)}>
              <h1>{this.props.title}</h1>
            </header>
            <a
              aria-label="close modal"
              className={cx(style.close)}
              href="#"
              onClick={this._handleClose}
            >
              <span className={cx(style.leg)} />
            </a>
          </div>
          <div className={cx(style.content)}>
            {this.props.children}
          </div>
        </div>
      </div>;
    const placeholder = null;
    return (
      <div>
        {!this.state.isShown ? placeholder : modal}
      </div>
    );
  }
}

module.exports = Modal;
