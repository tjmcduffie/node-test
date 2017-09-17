"use strict";

const server = require('~/app/server');
const request = require('superagent');

const PORT = 3001;
const uriPrefix = `http://localhost:${PORT}`;
const ApiLocationURIBuilder = require('~/app/generated/routes/ApiLocationURIBuilder');
const location = 'testville';
const state = 'testachusetts'
const locationState = `${state}--${location}`;

describe('SampleRoute', () => {
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
        .setParam('locationname', 'testville')
        .setParam('state', 'testachusetts')
        .toString();
      request
        .post(uriPrefix + uri)
        .send({
          locationname: 'testville',
          state: 'testachusetts',
          suggestedBy: 'Tim',
        })
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body.data.location.locationState).toBe(locationState);
          expect(res.body.data.location.name).toBe(location);
          expect(res.body.data.location.state).toBe(state);
          expect(res.body.data.location.suggestedBy).toBe('Tim');
          done();
        });
    });
    it('should handle 500 errors', done => {
      const uri = ApiLocationURIBuilder
        .getURIBuilder()
        .setParam('locationname', 'testville')
        .setParam('state', 'testachusetts')
        .toString();
      request
        .post(uriPrefix + uri)
        .send({
          locationname: 'testville',
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
        .setParam('locationname', 'testville')
        .setParam('state', 'testachusetts')
        .toString();
      request
        .get(uriPrefix + uri)
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body.data.location.locationState).toBe(locationState);
          expect(res.body.data.location.name).toBe(location);
          expect(res.body.data.location.state).toBe(state);
          expect(res.body.data.location.suggestedBy).toBe('Tim');
          done();
        });
    });
    it('should handle 404 errors', done => {
      const uri = ApiLocationURIBuilder
        .getURIBuilder()
        .setParam('locationname', 'foo')
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
        .setParam('locationname', 'testville')
        .setParam('state', 'testachusetts')
        .toString();
      request
        .put(uriPrefix + uri)
        .send({suggestedBy: 'Kristine'})
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body.data.location.locationState).toBe(locationState);
          expect(res.body.data.location.name).toBe(location);
          expect(res.body.data.location.state).toBe(state);
          expect(res.body.data.location.suggestedBy).toBe('Kristine');
          done();
        });
    });
    it('should handle 404 errors', done => {
      const uri = ApiLocationURIBuilder
        .getURIBuilder()
        .setParam('locationname', 'foo')
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
        .setParam('locationname', 'testville')
        .setParam('state', 'testachusetts')
        .toString();
      request
        .delete(uriPrefix + uri)
        .end(function(err, res) {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          expect(res.body.data.location.locationState).toBe(locationState);
          expect(res.body.data.location.name).toBe(location);
          expect(res.body.data.location.state).toBe(state);
          done();
        });
    });
    it('should handle 404 errors', done => {
      const uri = ApiLocationURIBuilder
        .getURIBuilder()
        .setParam('locationname', 'testville')
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
