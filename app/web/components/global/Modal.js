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
const style = require('~/app/static_src/css/Modal.css');

class Modal extends React.PureComponent<Props, State> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      isShown: false,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isShown !== this.props.isShown) {
      this.setState({isShown: nextProps.isShown});
    }
  }

  _handleClose = (e: Event): void => {
    e.preventDefault();
    this.setState({isShown: false});
    this.props.onClose && this.props.onClose();
  }

  render() {
    const modal =
      <div className={cx(style.screen)}>
        <div className={cx(style.container)}>
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
    const placeholder = <div />;
    return (
      <div>
        {!this.state.isShown ? placeholder : modal}
      </div>
    );
  }
}

module.exports = Modal;
