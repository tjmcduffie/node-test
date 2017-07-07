/*global */
/**
 *
 * @flow
 */

"use strict";

const IdEnum = require('~/app/lib/IdEnum');
const InternalLink = require('~/app/web/components/global/InternalLink');
const NavRoutes = require('~/app/web/generated/NavRoutes');
const React = require('react');

const styles = require('~/app/static_src/css/MainNav.css');

import type {Element as ReactElement} from 'react';

class MainNav extends React.PureComponent {
  render() {
    return (
      <nav
        className={styles.nav}
        id={IdEnum.MAIN_NAV}
      >
        <ul className={styles.list}>
          {NavRoutes.map(route => {
            return (
              <li
                className={styles.item}
                key={route.key}
              >
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
