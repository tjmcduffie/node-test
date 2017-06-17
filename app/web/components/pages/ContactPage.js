/*global */
/**
 * 
 * //flow
 */

"use strict";

const React = require('react');

const ContactPage = () => {
  return (
    <article className="contact-page">
      <div>
        <div className="block row">
          <div className="md-col-8 lg-col-5">
            <h2>Shoot me an Email.</h2>
            <p>Please reach out to me with any comments or inquiries. I can also be found on <a href="http://github.com/tjmcduffie/">Github</a> and <a href="http://www.linkedin.com/in/timmcduffie/">LinkedIn</a>.</p>
            <form
              action="/contact/send_mail.php"
              method="post"
              noValidate={true}
            >
              <fieldset>
                <legend>Contact message</legend>
                <label>
                  <input
                    data-error-message="no name"
                    id="name"
                    name="name"
                    pattern="/fo(o)/"
                    placeholder="Name"
                    required={true}
                    type="text"
                    value=""
                  />
                  <span>Name (required)</span>
                </label>
                <label>
                  <input
                    data-error-message="thats not an email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required={true}
                    type="email"
                    value=""
                  />
                  <span>Email (required)</span>
                </label>
                <label>
                  <textarea
                    data-error-message="say somethign!"
                    id="message"
                    name="message"
                    placeholder="Message"
                    required={true}
                  >
                  </textarea>
                  <span>Message (required)</span>
                </label>
              </fieldset>
              <span className="submit-button">
                <input
                  id="submit-btn"
                  type="submit"
                  value="Send it along"
                />
              </span>
            </form>
          </div>
        </div>
      </div>
    </article>
  );
};

module.exports = ContactPage;
