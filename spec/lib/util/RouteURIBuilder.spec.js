"use strict";

const RouteURIBuilder = require('~/app/lib/util/RouteURIBuilder');

const uri1 = `/cities/:state/:cityname`;

describe('The RouteURIBuilder', () => {
  it('should return the raw URI if not modified', () => {
    const builder = new RouteURIBuilder(uri1);
    expect(builder.toString()).toEqual(uri1);
    expect(builder.getURIString()).toEqual(uri1);
  });

  it('should populate params', () => {
    const builder = new RouteURIBuilder(uri1);
    const uri = builder
      .setParam('state', 'MA')
      .setParam('cityname', 'Boston')
      .getURIString();
    expect(uri).toEqual('/cities/MA/Boston');
  });

  it('should populate standard query params', () => {
    const builder = new RouteURIBuilder(uri1);
    const uri = builder
      .setParam('state', 'MA')
      .setParam('cityname', 'Boston')
      .setParam('foo','bar')
      .getURIString();
    expect(uri).toBe('/cities/MA/Boston?foo=bar');
  });

  it('should populate null query params', () => {
    const builder = new RouteURIBuilder(uri1);
    const uri = builder
      .setParam('state', 'MA')
      .setParam('cityname', 'Boston')
      .setParam('foo', null)
      .getURIString();
    expect(uri).toBe('/cities/MA/Boston?foo');
  });

  it('should populate multiple mixed query params', () => {
    const builder = new RouteURIBuilder(uri1);
    const uri = builder
      .setParam('state', 'MA')
      .setParam('cityname', 'Boston')
      .setParam('foo','bar')
      .setParam('bang', null)
      .getURIString();
    expect(uri).toBe('/cities/MA/Boston?foo=bar&bang');
  });
});
