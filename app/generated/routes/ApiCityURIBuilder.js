/**
 * @generated
 */

'use strict';

const URIBuilder = require('~/app/lib/util/URIBuilder.js');

const ApiCityURIBuilder = {
  getURIBuilder: () => {
    return new URIBuilder('/api/city/:state/:cityname');
  }
};

module.exports = ApiCityURIBuilder;
