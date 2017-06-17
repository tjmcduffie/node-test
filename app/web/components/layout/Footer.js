/*global */
/**
 * 
 * //flow
 */

"use strict";

const React = require('react');

module.exports = function Footer(props: {
  id: string,
}) {
  return (
    <footer id={props.id}>
      <ul className="block row">
        <li className="lg-col-12">
          All original content &copy; 2017 Tim McDuffie unless otherwise noted.
        </li>
      </ul>
    </footer>
  );
}
