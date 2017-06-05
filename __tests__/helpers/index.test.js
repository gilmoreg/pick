/* globals describe, it, expect */
const helpers = require('../../helpers');

describe('Helpers', () => {
  it('errResponse should render an error message', (done) => {
    const ctx = helpers.errResponse({}, 200, 'test');
    expect(ctx.status).toBe(200);
    expect(ctx.body.errors[0].msg).toBe('test');
    expect(ctx.body.errors[0].status).toBe(200);
    done();
  });
});
