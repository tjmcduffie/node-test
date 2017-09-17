/**
 * @generated
 */

'use strict';

const URIBuilder = require('~/app/lib/util/URIBuilder.js');

const ApiLocationsURIBuilder = {
  getURIBuilder: () => {
    return new URIBuilder('/api/locations/:page');
  },
};

module.exports = ApiLocationsURIBuilder;
