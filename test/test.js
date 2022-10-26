const request = require('supertest');
const app = require('../server/index.js');

describe('Test example', () => {
  test('GET /qa/questions', (done) => {
    request(app)
      .get('/qa/questions/?product_id=1&count=1000')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  });

  test('GET /qa/questions/:question_id/answers', (done) => {
    request(app)
      .get('/qa/questions/1/answers')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  });

  /* test('POST /qa/questions', (done) => {
    request(app)
      .get('/qa')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  });

  test('POST /qa/questions/:question_id/answers', (done) => {
    request(app)
      .get('/qa')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  });

  test('PUT /qa/questions/:question_id/helpful', (done) => {
    request(app)
      .get('/qa/questions/1/helpful')
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  });

  test('PUT /qa/questions/:question_id/report', (done) => {
    request(app)
      .get('/qa/questions/1/report')
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  });

  test('PUT /qa/answers/:answer_id/helpful', (done) => {
    request(app)
      .get('/qa/answers/5/helpful')
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  });

  test('PUT /qa/answers/:answer_id/report', (done) => {
    request(app)
      .get('/qa/answers/10/report')
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  }); */
});