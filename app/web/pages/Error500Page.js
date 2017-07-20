/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Element as ReactElement} from 'react';

const React = require('react');

const Error500Page = (): ReactElement<*> => {
  return (
    <article className="error-not-found-page">
      <div>
        <div className="block row">
          <div className="md-col-8 lg-col-5">
            <h2>Oh poop.</h2>
            <p>Something went wrong.</p>
          </div>
        </div>
      </div>
    </article>
  );
};

module.exports = Error500Page;
