/* eslint-disable jest/valid-expect */
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const express = require('express');
const reviewsRouter = require('./controllers');

describe('GET /reviews/', () => {
  let server;
  const port = 3002;
  const app = express();

  before((done) => {
    app.use(reviewsRouter);
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

    request(app).get(`/`).expect(200).expect('Content-Type', /json/).end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should include review_id and photos property', (done) => {

    request(app).get(`/`).expect(200).end((err, res) => {
      console.log(res.body)
        if (err) return done(err);
        expect(res.body[0]).to.have.property('review_id').to.be.a('number');
        expect(res.body[0]).to.have.property('product_id').to.be.a('number');
        expect(res.body[0]).to.have.property('rating').to.be.a('number');
        expect(res.body[0]).to.have.property('summary').to.be.a('string');;
        expect(res.body[0]).to.have.property('date').to.equal('2020-07-30T08:41:21.000Z')
        expect(res.body[0]).to.have.property('body').to.be.a('string');;
        expect(res.body[0]).to.have.property('recommend').to.be.a('boolean');;
        expect(res.body[0]).to.have.property('reviewer_name').to.be.a('string');;
        expect(res.body[0]).to.have.property('response').to.be.a('string');;
        expect(res.body[0]).to.have.property('helpfulness').to.be.a('number');
        expect(res.body[0]).to.have.property('photos').to.be.an('array');;
        done();
      });
  });

  it('should return a 200 status code and valid JSON response for reviews meta data', (done) => {

    request(server).get(`/meta/?product_id=1`).expect(200).expect('Content-Type', /json/).end((err, res) => {
        if (err) return done(err);
        console.log(res.body[0])
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.property('product_id').to.be.a(`number`);
        expect(res.body[0]).to.have.property('ratings').to.have.property("1").to.be.a('number');
        expect(res.body[0]).to.have.property('ratings').to.have.property("2").to.be.a('number');
        expect(res.body[0]).to.have.property('ratings').to.have.property("3").to.be.a('number');
        expect(res.body[0]).to.have.property('ratings').to.have.property("4").to.be.a('number');
        expect(res.body[0]).to.have.property('ratings').to.have.property("5").to.be.a('number');
        expect(res.body[0]).to.have.property('recommend').to.have.property('0').to.be.a('number');
        expect(res.body[0]).to.have.property('recommend').to.have.property('1').to.be.a('number');
        expect(res.body[0]).to.have.property('characteristics').to.have.property('Fit').to.have.property('id').to.be.a('number');
        expect(res.body[0]).to.have.property('characteristics').to.have.property('Fit').to.have.property('value').to.be.a('number');
        expect(res.body[0]).to.have.property('characteristics').to.have.property('Length').to.have.property('id').to.be.a('number');
        expect(res.body[0]).to.have.property('characteristics').to.have.property('Length').to.have.property('value').to.be.a('number');
        expect(res.body[0]).to.have.property('characteristics').to.have.property('Comfort').to.have.property('id').to.be.a('number');
        expect(res.body[0]).to.have.property('characteristics').to.have.property('Comfort').to.have.property('value').to.be.a('number');
        expect(res.body[0]).to.have.property('characteristics').to.have.property('Quality').to.have.property('id').to.be.a('number');
        expect(res.body[0]).to.have.property('characteristics').to.have.property('Quality').to.have.property('value').to.be.a('number');
        done();
      });
  });
});
