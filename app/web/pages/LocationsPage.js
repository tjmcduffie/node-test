/*global */
/**
 *
 * @flow
 */

"use strict";

import type {LocationsData} from '~/app/lib/models/Location';
import type {Node as ReactNode} from 'react';

export type LocationsRouteParamsType = {
  page?: number,
};

const ApiLocationsURIBuilder = require('~/app/generated/routes/ApiLocationsURIBuilder');
const AsyncRequest = require('~/app/lib/util/AsyncRequest');
const Block = require('~/app/web/components/global/Block');
const NewLocationButton = require('~/app/web/components/location/NewLocationButton')
const Link = require('~/app/web/components/global/Link');
const Page = require('~/app/web/components/global/Page');
const React = require('react');
const WebLocationURIBuilder = require('~/app/generated/routes/WebLocationURIBuilder');

const LocationsPage = (props: LocationsData): ReactNode => {
  const {locations} = props;
  return (
    <Page>
      <Block theme={Block.theme.GREY}>
        <p>Locations Page</p>
        <NewLocationButton />
        <ul>
          {locations.map(location => {
            const locationWebPath = WebLocationURIBuilder
              .getURIBuilder()
              .setParam('state', location.state)
              .setParam('locationname', location.name)
              .toString()
            return (
              <li key={location._id}>
                <Link href={locationWebPath}>
                  <b>{location.name}, {location.state}</b>
                </Link> suggested by {location.suggestedBy}
              </li>
            );
          })}
        </ul>
      </Block>
    </Page>
  );
};

LocationsPage.genClientData = (
  params: LocationsRouteParamsType
): Promise<LocationsData> => {
  const page = params.page || 0;
  const locationsApiRoute = ApiLocationsURIBuilder
    .getURIBuilder()
    .setParam('page', page)
    .toString()
  return new Promise((resolve, reject) => {
    new AsyncRequest(locationsApiRoute)
      .get()
      .then(response => resolve(response.data))
      .catch(e => reject(e));
  });
}

module.exports = LocationsPage;
