/* globals describe, it, expect */
const app = require('../server');
const request = require('supertest').agent(app.listen());

describe('Server', () => {
  it('should return 200 status', async (done) => {
    const result = await request.get('/');
    expect(result.status).toBe(200);
    done();
  });
});
