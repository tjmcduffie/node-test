"use strict";

const enzyme = require('enzyme');
const jasmineEnzyme = require('jasmine-enzyme');
const Modal = require('~/app/web/components/global/Modal');
const React = require('react');
const ReactModal = require('react-modal');
const style = require('~/app/static_src/css/Modal.css');

describe('<Modal />', () => {
  const {shallow} = enzyme;
  const eventMock = {preventDefault: () => {}};

  beforeEach(() => {
    jasmineEnzyme();
  });

  it('should render a ReactModal', () => {
    const wrapper = shallow(
      <Modal isShown={false} title="test">
        const content = <div>this is the content</div>
      </Modal>
    );
    expect(wrapper.find(ReactModal).length).toBe(1);
  });

  it('should set apply the correct base classnames', () => {
    const wrapper = shallow(
      <Modal isShown={false} title="test">
        <div>this is the content</div>
      </Modal>
    );
    expect(wrapper.prop('className')).toBe(style.container);
    expect(wrapper.prop('overlayClassName')).toBe(style.screen);
  });

  describe('shown state', () => {
    it('should propagate when receeiving props', () => {
      const wrapper = shallow(
        <Modal isShown={false} title="test">
          <div>this is the content</div>
        </Modal>
      );
      expect(wrapper.find(ReactModal).prop('isOpen')).toBeFalsy();
      wrapper.setProps({isShown: true});
      expect(wrapper.find(ReactModal).prop('isOpen')).toBeTruthy();
      wrapper.setProps({isShown: false});
      expect(wrapper.find(ReactModal).prop('isOpen')).toBeFalsy();
    });

    it('should be updated when the click button is closed', () => {
      const wrapper = shallow(
        <Modal isShown={false} title="test">
          <div>this is the content</div>
        </Modal>
      );
      wrapper.setProps({isShown: true});
      wrapper.find(`.${style.close}`).simulate('click', eventMock);
      expect(wrapper.find(ReactModal).prop('isOpen')).toBeFalsy();
    });

    it('should pass _handleClose to onRequestClose', () => {
      const wrapper = shallow(
        <Modal isShown={false} title="test">
          <div>this is the content</div>
        </Modal>
      );
      const onRequestClose = wrapper.find(ReactModal).prop('onRequestClose');
      expect(onRequestClose).toBeDefined();
      expect(typeof onRequestClose).toBe('function');
    });
  });


});
