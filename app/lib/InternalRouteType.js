/*global ReactClass*/
/**
 *
 * @flow
 */

"use strict";

export type RouteMethodTypes = 'DELETE'|'GET'|'POST'|'PUT';

export type InternalRouteType = {
  Component: ReactClass<*>,
  fetchData: (params: *) => Promise<*>,
  name: string,
  path: string,
};

export type InternalRouteListType = Array<InternalRouteType>;
