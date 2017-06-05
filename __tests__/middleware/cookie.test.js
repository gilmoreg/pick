/* globals describe, it, expect */
const cookie = require('../../middleware/cookie');

describe('Cookie Middleware', () => {
  it('parses a cookie and adds it to ctx', (done) => {
    const ctx = {
      headers: {
        cookie: 'test=test',
      },
    };

    cookie.cookieParser(ctx, () => {
      expect(ctx.cookie.test).toBe('test');
      done();
    });
  });
});
