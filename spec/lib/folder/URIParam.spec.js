"use strict";

const URIParam = require('~/app/lib/util/URIParam');

describe('URIParam', () => {
  it('prepares param values for use in URIs', () => {
    expect(URIParam.prepare('Boston')).toBe('boston');
    expect(URIParam.prepare('san francisco')).toBe('san-francisco');
    expect(URIParam.prepare('San Francisco')).toBe('san-francisco');
  });
});
