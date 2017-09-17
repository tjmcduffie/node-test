/*global */
/**
 *
 * @flow
 */

"use strict";

import type {LocationData} from '~/app/lib/models/Location';
import type {Element as ReactElement} from 'react';

export type LocationRouteParamsType = {
  locationname: string,
  state: string,
};

const ApiLocationURIBuilder = require('~/app/generated/routes/ApiLocationURIBuilder');
const AsyncRequest = require('~/app/lib/util/AsyncRequest');
const Block = require('~/app/web/components/global/Block');
const Page = require('~/app/web/components/global/Page');
const React = require('react');

const LocationPage = (props: LocationData): ReactElement<*> => {
  const {location} = props;
  return (
    <Page>
      <Block theme={Block.theme.GRID_LIGHT}>
        <p>Location Page</p>
        <ul>
          <li>{location.name}, {location.state}</li>
          <li>suggested by {location.suggestedBy}</li>
        </ul>
      </Block>
    </Page>
  );
}

LocationPage.genClientData = (
  params: LocationRouteParamsType
): Promise<LocationData> => {
  const {
    locationname,
    state,
  } = params;
  const locationApiRoute = ApiLocationURIBuilder
    .getURIBuilder()
    .setParam('locationname', locationname)
    .setParam('state', state)
    .toString();
  return new Promise((resolve, reject) => {
    new AsyncRequest(locationApiRoute)
      .get()
      .then(response => resolve(response.data))
      .catch(e => reject(e));
  });
}

module.exports = LocationPage;
