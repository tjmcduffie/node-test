"use strict";

const server = require('~/app/server');
const request = require('superagent');
const CitiesRoute = require('~/app/web/routes/CitiesRoute')

const PORT = 3001;
const PATH = CitiesRoute.getPath()
  .replace(':page','1');
const uri = `http://localhost:${PORT}${PATH}`;

describe('The Cities page', () => {
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
