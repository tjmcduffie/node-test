"use strict";

const server = require('~/app/server');
const request = require('superagent');

const PORT = 3001;
const uri = `http://localhost:${PORT}/api/test`;

describe('TestRoute', () => {
  let app

  afterEach(() => {
    app.close();
  });

  beforeEach(done => {
    app = server(PORT, () => done());
  });

  it('should handle delete requests', done => {
    request
      .delete(uri)
      .accept('json')
      .end(function(err, res) {
        expect(err).toBeNull();
        expect(res.body).toEqual({data: 'test:delete', error: null});
        done();
      });
  });
  describe('should handle get requests', () => {
    it('supports unversioned requests', done => {
      request
        .get(uri)
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.body).toEqual({data: "test:get:2.2.1", error: null});
          done();
        });
    });
    it('supports v1.0.0 requests', done => {
      request
        .get(uri)
        .set('accept-version', '1.0.0')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.body).toEqual({"data": "test:get:1.0.0", error: null});
          done();
        });
    });
    it('supports v3.0.0 requests', done => {
      request
        .get(uri)
        .set('accept-version', '3.0.0')
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.body).toEqual({"data": "test:get:2.2.1", error: null});
          done();
        });
    });
  });
  it('should handle post requests', done => {
    request
      .post(uri)
      .accept('json')
      .end(function(err, res) {
        expect(err).toBeNull();
        expect(res.body).toEqual({"data": "test:post", "error": null});
        done();
      });
  });
  it('should handle put requests', done => {
    request
      .put(uri)
      .accept('json')
      .end(function(err, res) {
        expect(err.status).toBe(500);
        expect(res.body.data).toEqual({});
        expect(typeof res.body.error.name).toBe('string');
        expect(res.body.error.message).toBe('test:put:error');
        done();
      });
  });
});
