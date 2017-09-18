/**
 * @generated
 */

'use strict';

const URIBuilder = require('~/app/lib/util/URIBuilder.js');

const ApiLocationURIBuilder = {
  getURIBuilder: () => {
    return new URIBuilder('/api/location/:state/:city');
  },
};

module.exports = ApiLocationURIBuilder;
