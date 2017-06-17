/*global */
/**
 * 
 * @flow
 */

"use strict";

const BaseHtmlRoute = require('~/app/web/routes/BaseHtmlRoute');
const ContactPage = require('~/app/web/components/pages/ContactPage');
const React = require('react');

import type {$Request, $Response} from 'express';
import type {Element as ReactElement} from 'react';

const contactRoutePath = '/contact'

class ContactRoute extends BaseHtmlRoute {
  static getPath() {
    return contactRoutePath;
  }

  constructor(req: $Request, res: $Response) {
    super(req, res);
    this.setPageTitle('Contact Me');
  }

  setDesktopResponse(): ReactElement<*> {
    return React.createElement(ContactPage);
  }
}

module.exports = ContactRoute;
