/*global */
/**
 *
 * @flow
 */

"use strict";

import type {CitiesData} from '~/app/lib/models/City';
import type {Node as ReactNode} from 'react';

export type CitiesRouteParamsType = {
  page?: number,
};

const ApiCitiesURIBuilder = require('~/app/generated/routes/ApiCitiesURIBuilder');
const AsyncRequest = require('~/app/lib/util/AsyncRequest');
const Block = require('~/app/web/components/global/Block');
const NewCityButton = require('~/app/web/components/city/NewCityButton')
const Link = require('~/app/web/components/global/Link');
const Page = require('~/app/web/components/global/Page');
const React = require('react');
const WebCityURIBuilder = require('~/app/generated/routes/WebCityURIBuilder');

const CitiesPage = (props: CitiesData): ReactNode => {
  const {cities} = props;
  return (
    <Page>
      <Block theme={Block.theme.GREY}>
        <p>Cities Page</p>
        <NewCityButton />
        <ul>
          {cities.map(city => {
            const cityWebPath = WebCityURIBuilder
              .getURIBuilder()
              .setParam('state', city.state)
              .setParam('cityname', city.name)
              .toString()
            return (
              <li key={city._id}>
                <Link href={cityWebPath}>
                  <b>{city.name}, {city.state}</b>
                </Link> suggested by {city.suggestedBy}
              </li>
            );
          })}
        </ul>
      </Block>
    </Page>
  );
};

CitiesPage.genClientData = (
  params: CitiesRouteParamsType
): Promise<CitiesData> => {
  const page = params.page || 0;
  const citiesApiRoute = ApiCitiesURIBuilder
    .getURIBuilder()
    .setParam('page', page)
    .toString()
  return new Promise((resolve, reject) => {
    new AsyncRequest(citiesApiRoute)
      .get()
      .then(response => resolve(response.data))
      .catch(e => reject(e));
  });
}

module.exports = CitiesPage;
