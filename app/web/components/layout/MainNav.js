/*global */
/**
 *
 * @flow
 */

"use strict";

const InternalLink = require('~/app/web/components/global/InternalLink');
const NavRoutes = require('~/app/web/generated/NavRoutes');
const React = require('react');

import type {Element as ReactElement} from 'react';

class MainNav extends React.PureComponent {
  props: {
    className: string,
    id: string,
  };

  render() {
    return (
      <nav
        className={this.props.className}
        id={this.props.id}
      >
        <ul>
          {NavRoutes.map(route => {
            return (
              <li key={route.key}>
                <InternalLink href={route.path} route={route}>
                  {route.name}
                </InternalLink>
              </li>
            )
          })}
        </ul>
      </nav>
    );
  }
}

module.exports = MainNav;
