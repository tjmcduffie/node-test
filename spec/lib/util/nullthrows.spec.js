"use strict";

const nullthrows = require('~/app/lib/util/nullthrows');

describe('nullthrows', () => {
  it('should throw an error when receiving an undefined', () => {
    expect(() => nullthrows(undefined)).toThrow();
  });

  it('should throw an error when receiving a null', () => {
    expect(() => nullthrows(null)).toThrow();
  });

  it('should return the argument when its not null or undefined', () => {
    expect(() => nullthrows('test')).not.toThrow();
    expect(nullthrows('test')).toEqual('test');
    expect(nullthrows(1)).toEqual(1);
    expect(nullthrows({foo: 'bar'})).toEqual({foo: 'bar'});
    expect(nullthrows(['foo', 'bar'])).toEqual(['foo', 'bar']);
  });
});
