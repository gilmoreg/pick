/* globals describe, it, expect */
// const httpMocks = require('node-mocks-http');
const router = require('../routes');

describe('Routes', () => {
  it('catchErrors calls next on Promise.reject', (done) => {
    const ctx = {};

    const route = () => Promise.reject('testing error');
    const routeWithCatcher = router.catchErrors(route);
    const next = (err) => {
      expect(err).toEqual('testing error');
      done();
    };
    routeWithCatcher(ctx, next);
  });
});

