/*global */
/**
 *
 * @flow
 */

"use strict";

import type {CityData} from '~/app/lib/models/City';
import type {Element as ReactElement} from 'react';

export type CityRouteParamsType = {
  cityname: string,
  state: string,
};

const ApiCityURIBuilder = require('~/app/generated/routes/ApiCityURIBuilder');
const AsyncRequest = require('~/app/lib/util/AsyncRequest');
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

CityPage.genClientData = (
  params: CityRouteParamsType
): Promise<CityData> => {
  const {
    cityname,
    state,
  } = params;
  const cityApiRoute = ApiCityURIBuilder
    .getURIBuilder()
    .setParam('cityname', cityname)
    .setParam('state', state)
    .toString();
  return new Promise((resolve, reject) => {
    new AsyncRequest(cityApiRoute)
      .get()
      .then(response => resolve(response.data))
      .catch(e => reject(e));
  });
}

module.exports = CityPage;
