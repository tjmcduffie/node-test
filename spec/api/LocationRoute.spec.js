"use strict";

const server = require('~/app/server');
const request = require('superagent');

const PORT = 3001;
const uriPrefix = `http://localhost:${PORT}`;
const ApiLocationURIBuilder = require('~/app/generated/routes/ApiLocationURIBuilder');
const city = 'testville';
const state = 'testachusetts'
const cityState = `${state}--${city}`;

describe('LocationRoute', () => {
  let app

  afterEach(() => {
    app.close();
  });

  beforeEach(done => {
    app = server(PORT, () => done());
  });

  describe('post (create) requests', () => {
    it('should handle success', done => {
      const uri = ApiLocationURIBuilder
        .getURIBuilder()
        .setParam('city', 'testville')
        .setParam('state', 'testachusetts')
        .toString();
      request
        .post(uriPrefix + uri)
        .send({
          city: 'testville',
          state: 'testachusetts',
          suggestedBy: 'Tim',
        })
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body.data.location.cityState).toBe(cityState);
          expect(res.body.data.location.city).toBe(city);
          expect(res.body.data.location.state).toBe(state);
          expect(res.body.data.location.suggestedBy).toBe('Tim');
          done();
        });
    });
    it('should handle 500 errors', done => {
      const uri = ApiLocationURIBuilder
        .getURIBuilder()
        .setParam('city', 'testville')
        .setParam('state', 'testachusetts')
        .toString();
      request
        .post(uriPrefix + uri)
        .send({
          city: 'testville',
          state: 'testachusetts',
          suggestedBy: 'Tim',
        })
        .end(function(err, res) {
          expect(err).not.toBeNull();
          expect(res.status).toBe(500);
          expect(res.body.data).toEqual({});
          expect(res.body.error.name).toBe('SystemError');
          expect(res.body.error.status).toBe(500);
          done();
        });
    });
  });

  describe('get requests', () => {
    it('should handle success', done => {
      const uri = ApiLocationURIBuilder
        .getURIBuilder()
        .setParam('city', 'testville')
        .setParam('state', 'testachusetts')
        .toString();
      request
        .get(uriPrefix + uri)
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body.data.location.cityState).toBe(cityState);
          expect(res.body.data.location.city).toBe(city);
          expect(res.body.data.location.state).toBe(state);
          expect(res.body.data.location.suggestedBy).toBe('Tim');
          done();
        });
    });
    it('should handle 404 errors', done => {
      const uri = ApiLocationURIBuilder
        .getURIBuilder()
        .setParam('city', 'foo')
        .setParam('state', 'bar')
        .toString();
      request
        .get(uriPrefix + uri)
        .end(function(err, res) {
          expect(err).not.toBeNull();
          expect(res.status).toBe(404);
          expect(res.body.data).toEqual({});
          expect(res.body.error.name).toBe('NotFoundError');
          expect(res.body.error.status).toBe(404);
          done();
        });
    });
  });

  describe('put requests', () => {
    it('should handle success', done => {
      const uri = ApiLocationURIBuilder
        .getURIBuilder()
        .setParam('city', 'testville')
        .setParam('state', 'testachusetts')
        .toString();
      request
        .put(uriPrefix + uri)
        .send({suggestedBy: 'Kristine'})
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body.data.location.cityState).toBe(cityState);
          expect(res.body.data.location.city).toBe(city);
          expect(res.body.data.location.state).toBe(state);
          expect(res.body.data.location.suggestedBy).toBe('Kristine');
          done();
        });
    });
    it('should handle 404 errors', done => {
      const uri = ApiLocationURIBuilder
        .getURIBuilder()
        .setParam('city', 'foo')
        .setParam('state', 'bar')
        .toString();
      request
        .put(uriPrefix + uri)
        .send({suggestedBy: 'Kristine'})
        .end(function(err, res) {
          expect(err).not.toBeNull();
          expect(res.status).toBe(404);
          expect(res.body.data).toEqual({});
          expect(res.body.error.name).toBe('NotFoundError');
          expect(res.body.error.status).toBe(404);
          done();
        });
    });
  });

  describe('delete requests', () => {
    it('should handle success', done => {
      const uri = ApiLocationURIBuilder
        .getURIBuilder()
        .setParam('city', 'testville')
        .setParam('state', 'testachusetts')
        .toString();
      request
        .delete(uriPrefix + uri)
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body.data.location.cityState).toBe(cityState);
          expect(res.body.data.location.city).toBe(city);
          expect(res.body.data.location.state).toBe(state);
          done();
        });
    });
    it('should handle 404 errors', done => {
      const uri = ApiLocationURIBuilder
        .getURIBuilder()
        .setParam('city', 'testville')
        .setParam('state', 'testachusetts')
        .toString();
      request
        .delete(uriPrefix + uri)
        .end(function(err, res) {
          expect(err).not.toBeNull();
          expect(res.status).toBe(404);
          expect(res.body.data).toEqual({});
          expect(res.body.error.name).toBe('NotFoundError');
          expect(res.body.error.status).toBe(404);
          done();
        });
    });
  });
});
