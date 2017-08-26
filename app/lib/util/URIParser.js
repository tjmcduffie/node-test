/*global */
/**
 *
 * @flow
 */

"use strict";

const BaseError = require('~/app/lib/BaseError');

type ParsedURI = {
  hash: string,
  host: string,
  hostname: string,
  href: string,
  pathname: string,
  port: string,
  protocol: string,
  search: string,
};

const regexp = new RegExp([
  "^",                                // start url
  "(",                                // fully qualified url?
  "(https?:|ftp:|file:|mailto:{1})",  // protocol
  "\/\/",                             // slashes
  "(",                                // host
  "([a-z0-9\.]{1,255})",              // hostname
  "(:([0-9]{3,4}))?",                 // port (including colon)
  "){1}",                             // host complete
  ")?",                               // relative path
  "(\/[a-z0-9-_%\/\.]*)",             // pathname
  "([?]{1}[a-z0-9=&-_%+@]*)?",        // search
  "(#[a-z0-9-_%\.]*)?",               // hash
  "$",                                // end url
].join(""), "i");

class URIParserError extends BaseError {}

class URIParser {
  _regex: RegExp;
  _uri: ParsedURI;
  _uriString: string;

  constructor(uri: string) {
    this._regex = regexp;
    this._uriString = uri;
    this._uri = this._parse();
  }

  _parse() {
    const parsedUrl = this._uriString.match(this._regex);
    if (!parsedUrl) {
      throw new URIParserError(`${this._uriString} is not a valid URI`);
    }
    return {
      hash: parsedUrl[9],
      host: parsedUrl[4],
      hostname: parsedUrl[3],
      href: parsedUrl[0],
      pathname: parsedUrl[7],
      port: parsedUrl[6],
      protocol: parsedUrl[2],
      search: parsedUrl[8],
    }
  }

  getRawURI(): string {
    return this._uriString;
  }

  getParsedURI(): ParsedURI {
    return this._uri;
  }

  getHash(): string {
    return this._uri.hash;
  }

  getHost(): string {
    return this._uri.host;
  }

  getHostname(): string {
    return this._uri.hostname;
  }

  getHref(): string {
    return this._uri.href;
  }

  getPathname(): string {
    return this._uri.pathname;
  }

  getPort(): string {
    return this._uri.port;
  }

  getProtocol(): string {
    return this._uri.protocol;
  }

  getSearch(): string {
    return this._uri.search;
  }
}

module.exports = URIParser;
