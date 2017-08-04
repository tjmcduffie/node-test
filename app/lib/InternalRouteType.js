/*global ReactClass*/
/**
 *
 * @flow
 */

"use strict";

export type RouteMethodTypes = 'DELETE'|'GET'|'POST'|'PUT';

export type ApiRouteType = {
  methods: Array<RouteMethodTypes>,
  name: string,
  path: string,
};

export type WebRouteType = {
  Component: ReactClass<*>,
  fetchData: (params: *) => Promise<*>,
  name: string,
  path: string,
};

export type InternalRouteType =
  | ApiRouteType
  | WebRouteType;

export type ApiRouteListType = Array<ApiRouteType>;
export type WebRouteListType = Array<WebRouteType>;
export type InternalRouteListType = Array<InternalRouteType>;
