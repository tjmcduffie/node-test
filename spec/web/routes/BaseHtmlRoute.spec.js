"use strict";

const BaseHtmlRoute = require('~/app/web/routes/BaseHtmlRoute');

describe('The Base HTML Route', () => {
  // const React = jasmine.createSpyObj('React', ['createElement']);
  const responseMock = {
    render: jasmine.createSpy('render'),
    sendStatus: jasmine.createSpy('sendStatus'),
  };
  const newTestSuccessRouteData = {
    test: 'test',
  };
  let newBaseRoute, newTestSuccessRoute, newTestFailureRoute;

  class TestSuccessRoute extends BaseHtmlRoute {
    static getPath() {
      return '/test-success';
    }

    genData() {
      return new Promise(resolve => resolve(newTestSuccessRouteData));
    }

    setDesktopResponse() { return null; }
  }

  class TestFailureRoute extends BaseHtmlRoute {
    static getPath() {
      return '/test-fail';
    }

    genData() {
      return new Promise((resolve, reject) =>
        reject(new Error('test failure')));
    }

    setDesktopResponse() { return null; }
  }

  beforeEach(() => {
    newBaseRoute = new BaseHtmlRoute({}, responseMock);
    newTestSuccessRoute = new TestSuccessRoute({}, responseMock);
    newTestFailureRoute = new TestFailureRoute({}, responseMock);
  });

  it('allows retrieval of the layout view', () => {
    const layout1 = 'Default';
    expect(newBaseRoute.getLayoutView()).toBe(layout1);
    expect(newTestSuccessRoute.getLayoutView()).toBe(layout1);
  });

  it('allows setting of the layout view', () => {
    const layout1 = 'NotDefault1';
    const layout2 = 'NotDefault2';
    newBaseRoute.setLayoutView(layout1);
    newTestSuccessRoute.setLayoutView(layout2);
    expect(newBaseRoute.getLayoutView()).toBe(layout1);
    expect(newTestSuccessRoute.getLayoutView()).toBe(layout2);
  });

  it('allows retrieval of the page Title', () => {
    const title1 = 'Test Page';
    expect(newBaseRoute.getPageTitle()).toBe(title1);
    expect(newTestSuccessRoute.getPageTitle()).toBe(title1);
  });

  it('allows setting of the page title', () => {
    const title1 = 'NotDefault1';
    const title2 = 'NotDefault2';
    newBaseRoute.setPageTitle(title1);
    newTestSuccessRoute.setPageTitle(title2);
    expect(newBaseRoute.getPageTitle()).toBe(title1);
    expect(newTestSuccessRoute.getPageTitle()).toBe(title2);
  });

  it('allows setting the desktop response', () => {
    expect(newBaseRoute.setDesktopResponse).toThrow();
    expect(newTestSuccessRoute.setDesktopResponse).not.toThrow();
  });

  it('should generate data for the view', done => {
    Promise.all([
      Promise.all([
        newBaseRoute.genData(),
        newTestSuccessRoute.genData(),
      ]),
      new Promise((resolve) => {
        // we catch the error from genData and resolve this promise so we can
        // test results from all promises.
        newTestFailureRoute.genData().catch(err => {
          resolve(err.message);
        });
      }),
    ])
    .then((values) => {
      expect(newBaseRoute.genData).not.toThrow();
      expect(values[0][0]).toEqual({});

      expect(newTestSuccessRoute.genData).not.toThrow();
      expect(values[0][1]).toEqual(newTestSuccessRouteData);

      // this technically throws, but the promise above resolves when the call
      // to genData throws.
      expect(values[1]).toEqual('test failure');
      done();
    });
  });

  it('responds to get requests', done => {
    expect(newBaseRoute.get).toThrow();
    expect(responseMock.render).not.toHaveBeenCalled();
    expect(responseMock.sendStatus).not.toHaveBeenCalled();
    responseMock.render.calls.reset();
    responseMock.sendStatus.calls.reset();

    // newTestSuccessRoute.get();
    expect(() => newTestSuccessRoute.get()).not.toThrow();
    expect(responseMock.sendStatus).not.toHaveBeenCalled();
    responseMock.render.calls.reset();
    responseMock.sendStatus.calls.reset();
    // hack because BaseHtmlRoute.get executes a Promise and is async
    setTimeout(() => {
      expect(responseMock.render).toHaveBeenCalled();
      done();
    }, 100);
  });
});
