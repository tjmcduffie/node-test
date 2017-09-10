"use strict";

const enzyme = require('enzyme');
const jasmineEnzyme = require('jasmine-enzyme');
const Modal = require('~/app/web/components/global/Modal');
const React = require('react');
const style = require('~/app/static_src/css/Modal.css');

describe('<Modal />', () => {
  const {shallow} = enzyme;
  const eventMock = {preventDefault: () => {}};

  beforeEach(() => {
    jasmineEnzyme();
  });

  describe('markup', () => {
    it('renders an empty <div/> when hidden', () => {
      const wrapper = shallow(<Modal />);
      expect(wrapper.html()).toEqual('<div></div>');
    });

    it('renders the basics when shown', () => {
      const wrapper = shallow(<Modal isShown={true} title="test" />);
      expect(wrapper.find('h1').length).toBe(1);
      expect(wrapper.find('h1').text()).toBe('test');
      expect(wrapper.find(`.${style.close}`).length).toBe(1);
      expect(wrapper.find(`.${style.content}`).children().length).toBe(0);
    });

    it('displays child components in the content area', () => {
      const content = <div>this is the content</div>;
      const wrapper = shallow(
        <Modal isShown={true} title="test">
          {content}
        </Modal>
      );
      expect(wrapper.find(`.${style.content}`).children().length).toBe(1);
      // expect(wrapper.find(`.${style.content}`).html())
      expect(wrapper.find(`.${style.content}`).contains(content)).toBeTruthy();
    });
  });

  describe('behaviors', () => {
    it('toggles visibility when props are updated', () => {
      const content = <div>this is the content</div>;
      const wrapper = shallow(
        <Modal isShown={false} title="test">
          {content}
        </Modal>
      );
      expect(wrapper.find(`.${style.content}`).contains(content)).toBeFalsy();
      wrapper.setProps({isShown: true});
      expect(wrapper.find(`.${style.content}`).contains(content)).toBeTruthy();
      wrapper.setProps({isShown: false});
      expect(wrapper.find(`.${style.content}`).contains(content)).toBeFalsy();
    });

    it('hides the modal when the close button is clicked', () => {
      const content = <div>this is the content</div>;
      const wrapper = shallow(
        <Modal isShown={true} title="test">
          {content}
        </Modal>
      );
      expect(wrapper.find(`.${style.content}`).contains(content)).toBeTruthy();
      wrapper.find(`.${style.close}`).simulate('click', eventMock);
      expect(wrapper.find(`.${style.content}`).contains(content)).toBeFalsy();
    });

    it('hides the modal when the escape key is pressed', () => {
      const content = <div>this is the content</div>;
      const wrapper = shallow(
        <Modal isShown={true} title="test">
          {content}
        </Modal>
      );
      const eventMockKey = Object.assign({key: "Escape"}, eventMock);
      const eventMockKeyCode = Object.assign({keyCode: 27}, eventMock);
      const eventMockRandoKey = Object.assign({key: "A"}, eventMock);

      wrapper.find(`.${style.close}`).simulate('keypress', eventMockKey);
      expect(wrapper.find(`.${style.content}`).contains(content)).toBeFalsy();

      wrapper.setProps({isShown: true});
      wrapper.find(`.${style.close}`).simulate('keypress', eventMockKeyCode);
      expect(wrapper.find(`.${style.content}`).contains(content)).toBeFalsy();

      wrapper.setProps({isShown: true});
      wrapper.find(`.${style.close}`).simulate('keypress', eventMockRandoKey);
      expect(wrapper.find(`.${style.content}`).contains(content)).toBeTruthy();
    });
  });
});
