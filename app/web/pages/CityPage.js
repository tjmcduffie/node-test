/*global */
/**
 *
 * @flow
 */

"use strict";

import type {CityData} from '~/app/web/routes/CityRoute';
import type {Element as ReactElement} from 'react';

const Block = require('~/app/web/components/global/Block');
const Page = require('~/app/web/components/global/Page');
const React = require('react');

const CityPage = (props: CityData): ReactElement<*> => {
  const {city} = props;
  return (
    <Page>
      <Block theme={Block.theme.GRID_LIGHT}>
        <p>City Page</p>
        <ul>
          <li>{city.name}, {city.state}</li>
          <li>suggested by {city.suggestedBy}</li>
        </ul>
      </Block>
    </Page>
  );
}

module.exports = CityPage;
