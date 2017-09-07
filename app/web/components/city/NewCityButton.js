/*global SyntheticEvent*/
/**
 *
 * @flow
 */

"use strict";

import type {Response as JSONResponse} from '~/app/api/routes/BaseJsonApiRoute';
import type {Node as ReactNode} from 'react';

type Props = {
};

type State = {
  isModalVisible: boolean,
}

const Button = require('~/app/web/components/global/Button');
const Modal = require('~/app/web/components/global/Modal');
const NewCityForm = require('~/app/web/components/city/NewCityForm');
const React = require('react');

// const cx = require('classNames');

class NewCityButton extends React.PureComponent<Props, State> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  _handleClick = (e: SyntheticEvent<>) => {
    e.preventDefault();
    this.setState({isModalVisible: true});
  }

  _handleModalClose = (): void => {
    this.setState({isModalVisible: false});
  }

  _handleSubmitComplete = (response: ?JSONResponse, e: ?string): void => {
    if (e) {
      console.error(e);
      return;
    }
    console.log(response);
    this._handleModalClose();
  }

  render(): ReactNode {
    return (
      <div>
        <Button
          href="#"
          onClick={this._handleClick}
          theme={Button.theme.GREY}
        >
          Add new City
        </Button>
        <Modal
          isShown={this.state.isModalVisible}
          onClose={this._handleModalClose}
          title={'Add new city'}
        >
          <NewCityForm onSubmitComplete={this._handleSubmitComplete} />
        </Modal>
      </div>
    );
  }
}

module.exports = NewCityButton;
