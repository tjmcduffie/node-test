/**
 * @generated
 */

'use strict';

const URIBuilder = require('~/app/lib/util/URIBuilder.js');

const WebLocationURIBuilder = {
  getURIBuilder: () => {
    return new URIBuilder('/location/:state/:locationname');
  }
};

module.exports = WebLocationURIBuilder;
