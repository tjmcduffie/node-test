/*global */
/**
 *
 * @flow
 */

"use strict";

import type {CitiesData} from '~/app/lib/models/City';
import type {Element as ReactElement} from 'react';

export type CitiesRouteParamsType = {
  page?: number,
};

const ApiRouter = require('~/app/api/routes/Router');
const AsyncRequest = require('~/app/lib/util/AsyncRequest');
const Block = require('~/app/web/components/global/Block');
const Page = require('~/app/web/components/global/Page');
const React = require('react');
const {NotFoundError} = require('~/app/lib/ServerErrors');

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
};

CitiesPage.genClientData = (
  params: CitiesRouteParamsType
): Promise<CitiesData> => {
  const page = params.page || 0;
  const citiesApiRoute = ApiRouter.makePath('CitiesRoute', {page});
  return new Promise((resolve, reject) => {
    new AsyncRequest(citiesApiRoute)
      .get()
      .then(response => resolve(response.data))
      .catch(e => reject(e));
  });
}

module.exports = CitiesPage;
