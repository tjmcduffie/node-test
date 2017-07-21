/*global */
/**
 *
 * @flow
 */

"use strict";

import type {CitiesData} from '~/app/web/routes/CitiesRoute';
import type {Element as ReactElement} from 'react';

export type CitiesRouteParamsType = {
  page?: number,
};

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
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const DataCache = require('~/app/lib/util/DataCache');
      const initialData = DataCache.get(CitiesPage.name);
      if (initialData) {
        resolve(initialData);
      }
      reject(new NotFoundError());
    }, 1000);
  });
}

module.exports = CitiesPage;
