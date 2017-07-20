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

const Button = require('~/app/web/components/global/Button');
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
          styles.root,
        )}
      >
        <ul className={styles.list}>
          {NavRoutes.map(route => {
            return (
              <li
                className={styles.item}
                key={route.name}
              >
                <Button
                  href={route.path}
                  route={route}
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
