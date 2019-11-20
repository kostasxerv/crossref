const { expect } = require('chai');
const request = require('supertest');
const https = require('https');

const app = require('../server');
const saveData = require('../app/controllers/saveData');
const Article = require('mongoose').model('Article');

describe('APP Tests', function() {
  describe('# Remote API Test', function() {
    it('should fetch data from the remote API', function(done) {
      https.get(process.env.API_URL, res => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('# Database Test', function() {
    it('should save the data on the Database', function(done) {
      saveData(done);
    });

    it('should fetch data from the Database', function(done) {
      Article.find({}, (err, data) => {
        if (err) {
          console.error(err);
        }
        expect(data).to.be.an('array');
        done();
      });
    });
  });

  describe('# API TEST', function() {
    it('should fetch data from the API', function(done) {
      request(app)
        .get('/articles')
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.haveOwnProperty('articles');

          done();
        });
    });

    it('should fetch data from the API using query parameter "limit"', function(done) {
      request(app)
        .get('/articles?limit=5')
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          expect(res.body.articles).to.have.lengthOf(5);

          done();
        });
    });

    it('should fetch data from the API using query parameter "offset"', function(done) {
      request(app)
        .get('/articles?offset=5')
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.haveOwnProperty('articles');
          expect(res.body.articles).to.have.lengthOf(15);
          done();
        });
    });

    it('should fetch data from the API using query parameters "offset" and "limit"', function(done) {
      request(app)
        .get('/articles?limit=5&offset=5')
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          const data1 = res.body.articles;

          request(app)
            .get('/articles?limit=5&offset=5')
            .end((err, res) => {
              if (err) {
                console.error(err);
              }
              const data2 = res.body.articles;

              expect(data1).to.be.not.equal(data2);

              done();
            });
        });
    });

    it('should ensure the sorting by doi (asc)', function(done) {
      request(app)
        .get('/articles')
        .end((err, res) => {
          if (err) {
            console.error(err);
          }

          const data = res.body.articles;
          expect(data[1].doi >= data[0].doi).to.be.equal(true);

          done();
        });
    });
  });
});
