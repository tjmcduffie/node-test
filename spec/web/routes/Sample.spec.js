"use strict";

const server = require('~/app/server');
const request = require('superagent');
const SampleRoute = require('~/app/web/routes/SampleRoute')

const PORT = 3001;
const PATH = SampleRoute.getPath();
const uri = `http://localhost:${PORT}${PATH}`;

describe('The Sample page', () => {
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
        expect(err).toBeNull();
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});
