"use strict";

const BaseHtmlRoute = require('~/app/web/routes/BaseHtmlRoute');

describe('The Base HTML Route', () => {
  // const React = jasmine.createSpyObj('React', ['createElement']);
  const responseMock = {
    render: jasmine.createSpy('render'),
    sendStatus: jasmine.createSpy('sendStatus'),
  };
  let newBaseRoute, newTestRoute;

  class TestRoute extends BaseHtmlRoute {
    static getPath() {
      return '/test';
    }

    setDesktopResponse() {}
  }

  beforeEach(() => {
    newBaseRoute = new BaseHtmlRoute({}, responseMock);
    newTestRoute = new TestRoute({}, responseMock);
  });

  it('allows retrieval of the layout view', () => {
    const layout1 = 'Default';
    expect(newBaseRoute.getLayoutView()).toBe(layout1);
    expect(newTestRoute.getLayoutView()).toBe(layout1);
  });

  it('allows setting of the layout view', () => {
    const layout1 = 'NotDefault1';
    const layout2 = 'NotDefault2';
    newBaseRoute.setLayoutView(layout1);
    newTestRoute.setLayoutView(layout2);
    expect(newBaseRoute.getLayoutView()).toBe(layout1);
    expect(newTestRoute.getLayoutView()).toBe(layout2);
  });

  it('allows retrieval of the page Title', () => {
    const title1 = 'Test Page';
    expect(newBaseRoute.getPageTitle()).toBe(title1);
    expect(newTestRoute.getPageTitle()).toBe(title1);
  });

  it('allows setting of the page title', () => {
    const title1 = 'NotDefault1';
    const title2 = 'NotDefault2';
    newBaseRoute.setPageTitle(title1);
    newTestRoute.setPageTitle(title2);
    expect(newBaseRoute.getPageTitle()).toBe(title1);
    expect(newTestRoute.getPageTitle()).toBe(title2);
  });

  it('allows setting the desktop response', () => {
    expect(newBaseRoute.setDesktopResponse).toThrow();
    expect(newTestRoute.setDesktopResponse).not.toThrow();
  });

  it('responds to get requests', () => {
    newBaseRoute.get();
    expect(responseMock.render).not.toHaveBeenCalled();
    expect(responseMock.sendStatus).toHaveBeenCalledWith(500);
    responseMock.render.calls.reset();
    responseMock.sendStatus.calls.reset();

    newTestRoute.get();
    expect(responseMock.render).toHaveBeenCalled();
    expect(responseMock.sendStatus).not.toHaveBeenCalled();
    responseMock.render.calls.reset();
    responseMock.sendStatus.calls.reset();
  });
});
