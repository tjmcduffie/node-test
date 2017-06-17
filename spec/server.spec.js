"use strict";

const server = require('~/app/server');
const request = require('superagent');

const PORT = 3001;
const uri = `http://localhost:${PORT}`;

describe('The server', () => {
  let app

  afterEach(() => {
    app.close();
  });

  beforeEach(done => {
    app = server(PORT, () => done());
  });

  it('should respond with 200', done => {
    request
      .get(uri)
      .end(function(err, res) {
        expect(err).toBeNull();
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});
