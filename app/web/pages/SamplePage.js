/*global */
/**
 *
 * //flow
 */

"use strict";

const React = require('react');

const SamplePage = () => {
  return (
    <article className="home-page">
      <div className="title" id="title">
        <div className="block row">
          <div className="lg-col-12">
            <img
              alt="tim mcduffie logo"
              className="md-col-12"
              src="img/logo.png"
            />
            <h1 className="md-col-12">
              Tim McDuffie
              <span className="subtitle">
                Web Engineer &amp; Technical Architect
              </span>
            </h1>
          </div>
        </div>
      </div>
      <div className="about" id="about">
        <div className="block row">
          <div className="lg-col-6 first">
            <p className="summary">I'm an engineer and technical architect with 9+ years experience building websites. My primary focus is client side development but I also dabble with NodeJS and PHP. <a href="/pdf/tmcduffie-resume.pdf">Download my CV</a></p>
            <p className="detail">JavaScript is my language of choice and am familiar with current frameworks and libraries such as AngularJS, Backbone, jQuery, Closure, etc. While frameworks and libraries are helpful I typically prefer leveraging native JS more oftent than not, especially where performance gains can be had. </p>
          </div>
          <div className="skills md-col-12 lg-col-5 lg-last">
            <h2>Technical Skills</h2>
            <div className="row md-col-6">
              <div className="sm-col-6 first">
                <h3>Client Side</h3>
                <ul>
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>SCSS/SASS</li>
                  <li>JavaScript</li>
                  <li>jQuery</li>
                  <li>Closure</li>
                  <li>AngularJS</li>
                  <li>Backbone</li>
                  <li>KnockoutJS</li>
                </ul>
              </div>
              <div className="sm-col-6 last">
                <h3>Server Side</h3>
                <ul>
                  <li>NodeJS</li>
                  <li>Apostrophe CMS</li>
                  <li>PHP</li>
                  <li>WordPress</li>
                  <li>Symfony</li>
                  <li>CodeIgniter</li>
                  <li>Apache</li>
                  <li>Nginx</li>
                  <li>MongoDB</li>
                </ul>
              </div>
            </div>
            <div className="row md-col-6 md-last">
              <div className="sm-col-6 first">
                <h3>Utilities</h3>
                <ul>
                  <li>NPM</li>
                  <li>Bower</li>
                  <li>Grunt</li>
                  <li>Jasmine</li>
                  <li>Mocha</li>
                  <li>Istanbul</li>
                </ul>
              </div>
              <div className="sm-col-6 last">
                <h3>Other</h3>
                <ul>
                  <li>AWS (OpsWorks, S3, CloudFront, EC2)</li>
                  <li>JAWS</li>
                  <li>VoiceOver</li>
                  <li>Adobe Creative Suite</li>
                  <li>MS Office</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

module.exports = SamplePage;
