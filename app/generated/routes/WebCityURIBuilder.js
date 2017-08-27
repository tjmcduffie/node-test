/**
 * @generated
 */

'use strict';

const URIBuilder = require('~/app/lib/util/URIBuilder.js');

const WebCityURIBuilder = {
  getURIBuilder: () => {
    return new URIBuilder('/city/:state/:cityname');
  }
};

module.exports = WebCityURIBuilder;
