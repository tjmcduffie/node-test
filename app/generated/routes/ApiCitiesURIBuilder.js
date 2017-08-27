/**
 * @generated
 */

'use strict';

const URIBuilder = require('~/app/lib/util/URIBuilder.js');

const ApiCitiesURIBuilder = {
  getURIBuilder: () => {
    return new URIBuilder('/api/cities/:page');
  }
};

module.exports = ApiCitiesURIBuilder;
