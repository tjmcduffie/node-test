/*global */
/**
 *
 * @flow
 */

"use strict";

import type {CitiesData} from '~/app/web/routes/CitiesRoute';
import type {Element as ReactElement} from 'react';

const Block = require('~/app/web/components/global/Block');
const Page = require('~/app/web/components/global/Page');
const React = require('react');

const CitiesPage = (props: CitiesData): ReactElement<*> => {
  const {cities} = props;
  return (
    <Page>
      <Block theme={Block.theme.GREY}>
        <p>Cities Page</p>
        <ul>
          {cities.map(city => {
            return (
              <li key={city._id}>
                <b>{city.name}, {city.state}</b> suggested by {city.suggestedBy}
              </li>
            );
          })}
        </ul>
      </Block>
    </Page>
  );
}

module.exports = CitiesPage;
