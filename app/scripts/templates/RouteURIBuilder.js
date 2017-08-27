module.exports = (prefixedRoute, path) =>
`/**
 * @generated
 */

'use strict';

const URIBuilder = require('~/app/lib/util/URIBuilder.js');

const ${prefixedRoute}URIBuilder = {
  getURIBuilder: () => {
    return new URIBuilder(${path});
  }
};

module.exports = ${prefixedRoute}URIBuilder;
`;
