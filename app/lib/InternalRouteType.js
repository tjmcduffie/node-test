/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Element as ReactElement} from 'react';

export type InternalRouteType = {
  action: () => ReactElement<*>,
  key: string,
  name: string,
  path: string,
  route: string,
};

export type InternalRouteListType = Array<InternalRouteType>;
