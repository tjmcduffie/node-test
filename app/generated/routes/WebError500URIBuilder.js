/**
 * @generated
 */

'use strict';

const URIBuilder = require('~/app/lib/util/URIBuilder.js');

const WebError500URIBuilder = {
  getURIBuilder: () => {
    return new URIBuilder('/system-error');
  }
};

module.exports = WebError500URIBuilder;
