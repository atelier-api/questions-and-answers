const request = require('supertest');
const app = require('../server/index.js');

describe('Test example', () => {
  test('GET /qa', (done) => {
    request(app)
      .get('/qa')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  });
});