/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Element as ReactElement} from 'react';

type Props = {
  className?: string,
}

const InternalLink = require('~/app/lib/components/InternalLink');
const NavRoutes = require('~/app/web/generated/NavRoutes');
const React = require('react');

const cx = require('classNames');
const styles = require('~/app/static_src/css/MainNav.css');

class MainNav extends React.PureComponent {
  props: Props;

  render(): ReactElement<*> {
    return (
      <nav
        className={cx(
          this.props.className,
          styles.nav,
        )}
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
