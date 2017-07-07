/*global */
/**
 *
 * @flow
 */

"use strict";

import type {$Request, $Response} from 'express';
import type {Element as ReactElement} from 'react';

const BaseHtmlRoute = require('~/app/web/routes/BaseHtmlRoute');
const ContactPage = require('~/app/web/components/pages/ContactPage');
const React = require('react');

const contactRoutePath: string = '/contact'

class ContactRoute extends BaseHtmlRoute {
  static getPath(): string {
    return contactRoutePath;
  }

  static postPath(): string {
    return contactRoutePath;
  }

  constructor(req: $Request, res: $Response): void {
    super(req, res);
    this.setPageTitle('Contact Me');
  }

  setDesktopResponse(): ReactElement<*> {
    return React.createElement(ContactPage);
  }

  post(): void {
    // @TODO
    throw new Error('Needs to be implemented');
  }
}

module.exports = ContactRoute;
