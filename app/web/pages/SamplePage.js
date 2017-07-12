/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Element as ReactElement} from 'react';

const Block = require('~/app/web/components/global/Block');
const Page = require('~/app/web/components/global/Page');
const React = require('react');

const SamplePage = (): ReactElement<*> => {
  return (
    <Page>
      <Block theme={Block.theme.GREEN}>
        <p>this is 'green</p>
      </Block>
      <Block theme={Block.theme.GREY}>
        <p>this is 'grey'</p>
      </Block>
      <Block theme={Block.theme.GRID_DARK}>
        <p>this is 'gridDark'</p>
      </Block>
      <Block theme={Block.theme.GRID_LIGHT}>
        <p>this is 'gridLight'</p>
      </Block>
      <Block theme={Block.theme.NONE}>
        <p>this is 'none'</p>
      </Block>
      <Block theme={Block.theme.WHITE}>
        <p>this is 'white'</p>
      </Block>
    </Page>
  );
}

module.exports = SamplePage;
