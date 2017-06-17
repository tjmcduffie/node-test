"use strict";

const {routes} = require('~/app/web');
const request = require('superagent');
const server = require('~/app/server');

const PORT = 3001;
const uri = `http://localhost:${PORT}`;

describe('All Web routes were mounted', () => {
  let app;

  afterEach(() => {
    app.close();
  });

  beforeEach(done => {
    app = server(PORT, () => done());
  });

  describe('should render without errors', () => {
    routes.forEach(Route => {
      let path = Route.getPath();
      if (path === '*') {
        path = '/*';
      }
      it(`for ${uri}${path}`, done => {
        request
          .get(`${uri}${path}`)
          .accept('html')
          .end(function(err, res) {
            expect(err).toBeNull();
            expect(res.statusCode).toBe(200);
            done();
          });
        });
    });
  });
});
