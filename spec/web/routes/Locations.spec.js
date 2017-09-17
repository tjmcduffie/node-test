"use strict";

const server = require('~/app/server');
const request = require('superagent');
const LocationsRoute = require('~/app/web/routes/LocationsRoute')

const PORT = 3001;
const PATH = LocationsRoute.getPath()
  .replace(':page','0');
const uri = `http://localhost:${PORT}${PATH}`;

describe('The Locations page', () => {
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
