/* eslint-disable jest/valid-expect */
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const express = require('express');
const qaRouter = require('./qa_controllers');

describe('GET /questions/:product_id', () => {
  let server;
  const port = 3002;
  const app = express();

  before((done) => {
    app.use(qaRouter);
    server = app.listen(port, () => {
      console.log(`Test server is running on http://localhost:${port}`);
      done();
    });
  });

  after((done) => {
    server.close(() => {
      console.log('Test server closed');
      done();
    });
  });

  it('should return a 200 status code and valid JSON response', (done) => {
    const productId = 37323;

    request(app)
      .get(`/questions/${productId}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should include product_id and results in the JSON response', (done) => {
    const productId = 37323;

    request(app)
      .get(`/questions/${productId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('product_id');
        expect(res.body).to.have.property('results');
        done();
      });
  });
});
