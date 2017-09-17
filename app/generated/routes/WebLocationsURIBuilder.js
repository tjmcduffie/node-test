/**
 * @generated
 */

'use strict';

const URIBuilder = require('~/app/lib/util/URIBuilder.js');

const WebLocationsURIBuilder = {
  getURIBuilder: () => {
    return new URIBuilder('/locations/:page?');
  },
};

module.exports = WebLocationsURIBuilder;
