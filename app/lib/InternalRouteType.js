/*global ReactClass*/
/**
 *
 * @flow
 */

"use strict";

export type InternalRouteType = {
  Component: ReactClass<*>,
  fetchData: (params: *) => Promise<*>,
  name: string,
  path: string,
};

export type InternalRouteListType = Array<InternalRouteType>;
