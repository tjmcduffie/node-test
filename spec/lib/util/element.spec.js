"use strict";

const enzyme = require('enzyme');
const jasmineEnzyme = require('jasmine-enzyme');
const React = require('react');
const Element = require('~/app/lib/util/element.js');

// @TODO need to implement a util for interacting with a non-react DOM that will
// also calculate dimensions. Don't want to go allthe way to selenium but that
// might be best.
xdescribe('Element helper', () => {
  const {shallow, mount} = enzyme;

  beforeEach(() => {
    jasmineEnzyme();
  });

  describe('findTabbableChildren', () => {
    it('find children that can receive focus via tabbing', () => {
      const Tester = () => {
        return (
          <div className="root">
            <span>1</span>
            <a href="#">2</a>
            <input />
            <textarea />
            <select><option>1</option></select>
            <button />
          </div>
        );
      }
      const wrapper = mount(<Tester />);
      const rootNode = wrapper.getDOMNode();
      const children = Element.findTabbableChildren(rootNode);
      expect(children.length).toEqual(5);
      expect(children[0].href).toEqual('#');
    });

    it('only finds links with hrefs', () => {
      const Tester = () => {
        return (
          <div className="root">
            <a>2</a>
            <a href="#">2</a>
          </div>
        );
      }
      const wrapper = shallow(<Tester />);
      const root = wrapper.find('.root');
      const children = Element.findTabbableChildren(root);
      expect(children.length).toEqual(1);
      expect(children[0].href).toEqual('#');
    });

    it('only finds elements with a positive tabIndex', () => {
      const Tester = () => {
        return (
          <div className="root">
            <span>1</span>
            <span tabIndex={true}>2</span>
            <span tabIndex={-1}>3</span>
            <span tabIndex={0}>4</span>
            <span tabIndex={1}>5</span>
          </div>
        );
      }
      const wrapper = shallow(<Tester />);
      const root = wrapper.find('.root');
      const children = Element.findTabbableChildren(root);
      expect(children.length).toEqual(2);
      expect(children[0].tabIndex).toEqual(0);
      expect(children[1].tabIndex).toEqual(1);
    });

    it('only finds visible elements', () => {
      const Tester = () => {
        return (
          <div className="root">
            <a className="visible" href="#">1</a>
            <a href="#" style={{visibility: 'hidden'}}>2</a>
            <a href="#" style={{display: 'none'}}>3</a>
            <a href="#" style={{height: '0px'}}>4</a>
            <a href="#" style={{width: '0px'}}>5</a>
          </div>
        );
      }
      const wrapper = shallow(<Tester />);
      const root = wrapper.find('.root');
      const children = Element.findTabbableChildren(root);
      expect(children.length).toEqual(1);
      expect(children[0].class).toEqual('visible');
    });
  });

  describe('isVisible', () => {
    it('returns false for elements that have no height', () => {
      const Tester = () => (
        <span className="root" style={{height: '0px'}}>1</span>
      );
      const wrapper = shallow(<Tester />);
      const root = wrapper.find('.root');
      expect(Element.isVisible(root)).toBeFalsy();
    });

    it('returns false for elements that have no width', () => {
      const Tester = () => (
        <span className="root" style={{width: '0px'}}>1</span>
      );
      const wrapper = shallow(<Tester />);
      const root = wrapper.find('.root');
      expect(Element.isVisible(root)).toBeFalsy();
    });

    it('returns false for elements that are hidden', () => {
      const Tester = () => (
        <span className="root" style={{visibility: 'hidden'}}>1</span>
      );
      const wrapper = shallow(<Tester />);
      const root = wrapper.find('.root');
      expect(Element.isVisible(root)).toBeFalsy();
    });

    it('returns false for elements that are not displayed', () => {
      const Tester = () => (
        <span className="root" style={{display: 'none'}}>1</span>
      );
      const wrapper = shallow(<Tester />);
      const root = wrapper.find('.root');
      expect(Element.isVisible(root)).toBeFalsy();
    });

    it('returns true for elements that are displayed', () => {
      const Tester = () => (
        <span className="root">1</span>
      );
      const wrapper = shallow(<Tester />);
      const root = wrapper.find('.root');
      expect(Element.isVisible(root)).toBeTruthy();
    });
  });
});
