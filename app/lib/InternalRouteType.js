/*global */
/**
 *
 * @flow
 */

"use strict";

import type {pageRenderer} from '~/app/lib/util/renderpage';

export type InternalRouteType = {
  action: (params: Object, query: Object) => pageRenderer,
  name: string,
  path: string,
  method: 'get',
};

export type InternalRouteListType = Array<InternalRouteType>;
