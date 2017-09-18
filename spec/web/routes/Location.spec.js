"use strict";

const server = require('~/app/server');
const request = require('superagent');
const LocationRoute = require('~/app/web/routes/LocationRoute')

const PORT = 3001;
const PATH = LocationRoute.getPath()
  .replace(':state','ma')
  .replace(':city','boston');
const uri = `http://localhost:${PORT}${PATH}`;

describe('The Location page', () => {
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
