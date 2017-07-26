"use strict";

const BaseHtmlRoute = require('~/app/web/routes/BaseHtmlRoute');
const {NotFoundError, SystemError} = require('~/app/lib/ServerErrors');

describe('The Base HTML Route', () => {
  // const React = jasmine.createSpyObj('React', ['createElement']);
  const responseMock = {
    render: jasmine.createSpy('render'),
    sendStatus: jasmine.createSpy('sendStatus'),
  };
  const mockComponent = {
    name: 'Foo',
  }
  const newTestSuccessRouteData = {
    test: 'test',
  };
  let newBaseRoute, newTestSuccessRouteWithoutData, newTestSuccessRouteWithData,
    newTestNotFoundRoute, newTestWildErrorRoute;

  class TestSuccessRouteWithoutData extends BaseHtmlRoute {
    static getPath() {
      return '/test-success-nodata';
    }

    setDesktopResponse() { return null; }
  }

  class TestSuccessRouteWithData extends BaseHtmlRoute {
    static getPath() {
      return '/test-success-data';
    }

    genData() {
      return new Promise(resolve => resolve({
        test: 'test',
      }));
    }

    setDesktopResponse() { return null; }
  }

  class TestNotFoundRoute extends BaseHtmlRoute {
    static getPath() {
      return '/test-fail-not-found';
    }

    genData() {
      return new Promise((resolve, reject) => reject(new NotFoundError()));
    }

    setDesktopResponse() { return null; }
  }

  class TestWildErrorRoute extends BaseHtmlRoute {
    static getPath() {
      return '/test-wild-error';
    }

    setDesktopResponse() { throw new SystemError('Wild Error'); }
  }

  beforeEach(() => {
    newBaseRoute = new BaseHtmlRoute({}, responseMock);
    newBaseRoute.setPageComponent(mockComponent);

    newTestSuccessRouteWithoutData =
      new TestSuccessRouteWithoutData({}, responseMock);
    newTestSuccessRouteWithoutData.setPageComponent(mockComponent);
    spyOn(newTestSuccessRouteWithoutData, 'genData').and.callThrough();
    spyOn(newTestSuccessRouteWithoutData, 'setDesktopResponse')
      .and.callThrough();

    newTestSuccessRouteWithData =
      new TestSuccessRouteWithData({}, responseMock);
    newTestSuccessRouteWithData.setPageComponent(mockComponent);
    spyOn(newTestSuccessRouteWithData, 'genData').and.callThrough();
    spyOn(newTestSuccessRouteWithData, 'setDesktopResponse').and.callThrough();

    newTestNotFoundRoute = new TestNotFoundRoute({}, responseMock);
    newTestNotFoundRoute.setPageComponent(mockComponent);
    spyOn(newTestNotFoundRoute, 'genData').and.callThrough();
    spyOn(newTestNotFoundRoute, 'setDesktopResponse').and.callThrough();

    newTestWildErrorRoute = new TestWildErrorRoute({}, responseMock);
    newTestWildErrorRoute.setPageComponent(mockComponent);
    spyOn(newTestWildErrorRoute, 'genData').and.callThrough();
    spyOn(newTestWildErrorRoute, 'setDesktopResponse').and.callThrough();
  });

  it('allows retrieval of the layout view', () => {
    const layout1 = 'Default';
    expect(newBaseRoute.getLayoutView()).toBe(layout1);
    expect(newTestSuccessRouteWithData.getLayoutView()).toBe(layout1);
  });

  it('allows setting of the layout view', () => {
    const layout1 = 'NotDefault1';
    const layout2 = 'NotDefault2';
    newBaseRoute.setLayoutView(layout1);
    newTestSuccessRouteWithData.setLayoutView(layout2);
    expect(newBaseRoute.getLayoutView()).toBe(layout1);
    expect(newTestSuccessRouteWithData.getLayoutView()).toBe(layout2);
  });

  it('allows retrieval of the page Title', () => {
    const title1 = 'Test Page';
    expect(newBaseRoute.getPageTitle()).toBe(title1);
    expect(newTestSuccessRouteWithData.getPageTitle()).toBe(title1);
  });

  it('allows setting of the page title', () => {
    const title1 = 'NotDefault1';
    const title2 = 'NotDefault2';
    newBaseRoute.setPageTitle(title1);
    newTestSuccessRouteWithData.setPageTitle(title2);
    expect(newBaseRoute.getPageTitle()).toBe(title1);
    expect(newTestSuccessRouteWithData.getPageTitle()).toBe(title2);
  });

  it('allows setting the desktop response', () => {
    expect(newBaseRoute.setDesktopResponse).toThrow();
    expect(newTestSuccessRouteWithData.setDesktopResponse).not.toThrow();
  });

  it('should generate data for the view', done => {
    Promise.all([
      Promise.all([
        newBaseRoute.genData(),
        newTestSuccessRouteWithData.genData(),
      ]),
      new Promise((resolve) => {
        // we catch the error from genData and resolve this promise so we can
        // test results from all promises.
        newTestNotFoundRoute.genData().catch(err => resolve(err));
      }),
    ])
    .then((values) => {
      expect(newBaseRoute.genData).not.toThrow();
      expect(values[0][0]).toEqual({});

      expect(newTestSuccessRouteWithData.genData).not.toThrow();
      expect(values[0][1]).toEqual(newTestSuccessRouteData);

      // this technically throws, but the promise above resolves when the call
      // to genData throws.
      expect(values[1] instanceof NotFoundError).toBe(true);
      done();
    });
  });

  describe('responds to get requests', () => {
    it('handles errors when setDesktopResponse is not implemented', done => {
      responseMock.sendStatus.calls.reset();
      newBaseRoute
        .get()
        .catch(e => {
          expect(e).not.toBeNull();
          expect(responseMock.sendStatus).toHaveBeenCalledWith(500);
          done();
        });
    });

    it('responds with success when there is no route data', done => {
      responseMock.render.calls.reset();
      newTestSuccessRouteWithoutData
        .get()
        .then(() => {
          expect(newTestSuccessRouteWithoutData.genData).toHaveBeenCalled();
          expect(newTestSuccessRouteWithoutData.setDesktopResponse)
            .toHaveBeenCalled();
          expect(responseMock.render).toHaveBeenCalled();
          done();
        });
    });

    it('responds with success when there is route data', done => {
      responseMock.render.calls.reset();
      newTestSuccessRouteWithData
        .get()
        .then(() => {
          expect(newTestSuccessRouteWithData.genData).toHaveBeenCalled();
          expect(newTestSuccessRouteWithData.setDesktopResponse)
            .toHaveBeenCalled();
          expect(responseMock.render).toHaveBeenCalled();
          done();
        });
    });

    it('handles not found errors when no appropriate data is found', done => {
      responseMock.sendStatus.calls.reset();
      newTestNotFoundRoute
        .get()
        .catch(e => {
          expect(newTestNotFoundRoute.genData).toHaveBeenCalled();
          expect(responseMock.sendStatus).toHaveBeenCalledWith(404);
          expect(e instanceof NotFoundError).toBe(true);
          done();
        });
    });

    it('handles server errors when something goes wrong', done => {
      responseMock.sendStatus.calls.reset();
      newTestWildErrorRoute
        .get()
        .catch(e => {
          expect(newTestWildErrorRoute.genData).toHaveBeenCalled();
          expect(newTestWildErrorRoute.setDesktopResponse).toHaveBeenCalled();
          expect(responseMock.sendStatus).toHaveBeenCalledWith(500);
          expect(e instanceof SystemError).toBe(true);
          expect(e.message).toBe('Wild Error');
          done();
        });
    });
  });
});
