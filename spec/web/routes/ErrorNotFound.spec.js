"use strict";

const server = require('~/app/server');
const request = require('superagent');
const ErrorNotFoundRoute = require('~/app/web/routes/ErrorNotFoundRoute')

const PORT = 3001;
const PATH = ErrorNotFoundRoute.getPath();
const uri = `http://localhost:${PORT}/${PATH}`;

describe('The ErrorNotFound page', () => {
  let app

  afterEach(() => {
    app.close();
  });

  beforeEach(done => {
    app = server(PORT, () => done());
  });

  it('should render without errors', done => {
    request
      .get(uri)
      .accept('html')
      .end(function(err, res) {
        expect(err).not.toBeNull();
        expect(res.statusCode).toBe(404);
        done();
      });
  });
});
