/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Node as ReactNode} from 'react';

type DefaultProps = {
  animationDuration: number,
  hideOnBlur: boolean,
}

type Props = DefaultProps & {
  children?: Array<ReactNode> | ReactNode,
  getParentNode?: () => HTMLElement,
  isShown: boolean,
  onAfterOpen?: () => void,
  onClose?: () => void,
  title: string,
};

type State = {
  isShown: boolean,
};

const React = require('react');
const ReactModal = require('react-modal');

const cx = require('classNames');
const nullthrows = require('~/app/lib/util/nullthrows');
const style = require('~/app/static_src/css/Modal.css');

class Modal extends React.PureComponent<Props, State> {
  props: Props;
  state: State;

  static defaultProps: DefaultProps = {
    animationDuration: 0,
    hideOnBlur: true,
  };

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

  _getParentSelector = (): () => HTMLElement => {
    return this.props.getParentNode
      ? this.props.getParentNode
      : () => nullthrows(document.body);
  }

  _handleAfterOpen = (): void => {
    this.props.onAfterOpen && this.props.onAfterOpen();
  }

  _handleClose = (e: Event): void => {
    e.preventDefault();
    this.setState({isShown: false});
    this.props.onClose && this.props.onClose();
  }

  render() {
    const {
      animationDuration,
      hideOnBlur,
      title,
    } = this.props;
    const {isShown} = this.state;

    return (
      <ReactModal
        className={cx(style.container)}
        closeTimeoutMS={animationDuration}
        contentLabel={title}
        isOpen={isShown}
        onAfterOpen={this._handleAfterOpen}
        onRequestClose={this._handleClose}
        overlayClassName={cx(style.screen)}
        parentSelector={this._getParentSelector()}
        shouldCloseOnOverlayClick={hideOnBlur}
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
      </ReactModal>
    );
  }
}

module.exports = Modal;
