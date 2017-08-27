/**
 * @generated
 */

'use strict';

const URIBuilder = require('~/app/lib/util/URIBuilder.js');

const WebCitiesURIBuilder = {
  getURIBuilder: () => {
    return new URIBuilder('/cities/:page?');
  }
};

module.exports = WebCitiesURIBuilder;
