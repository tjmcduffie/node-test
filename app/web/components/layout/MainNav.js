/*global */
/**
 *
 * @flow
 */

"use strict";

import type {Node as ReactNode} from 'react';

type NavLink = {
  name: string,
  path: string,
};

type Props = {
  className?: string,
}

const Button = require('~/app/web/components/global/Button');
const React = require('react');
const router = require('~/app/web/routes/Router');

const cx = require('classNames');
const styles = require('~/app/static_src/css/MainNav.css');

const navLinks: Array<NavLink> = [
  {
    name: 'Sample',
    path: router.makePath('SampleRoute'),
  }, {
    name: 'Locations',
    path: router.makePath('LocationsRoute', {page: 0}),
  },
  {
    name: 'Null',
    path: '/foobar',
  },
];

class MainNav extends React.PureComponent<Props> {
  props: Props;

  render(): ReactNode {
    return (
      <nav
        className={cx(
          this.props.className,
          styles.root,
        )}
      >
        <ul className={styles.list}>
          {navLinks.map((route, index) => {
            return (
              <li
                className={styles.item}
                key={index}
              >
                <Button
                  href={route.path}
                  theme={Button.theme.GREEN}
                >
                  {route.name}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>
    );
  }
}

module.exports = MainNav;
