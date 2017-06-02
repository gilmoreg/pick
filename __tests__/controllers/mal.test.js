/* globals describe, it, expect, afterEach */
const sinon = require('sinon');
const fetchMock = require('fetch-mock');
const malController = require('../../controllers/mal');
const app = require('../../server');
const fakes = require('../../helpers/fakes');
const request = require('supertest').agent(app.listen());

describe('MAL Controller', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should return a list on a valid query', async (done) => {
    fetchMock.mock(/.+malappinfo.+/g, fakes.malSearchResponse);
    fetchMock.mock(/.+verify.+/g, fakes.malAuthSuccess);
    const result = await request.get('/mal/list?auth=test');
    expect(result.body.list).toBeDefined();
    expect(result.body.list).toHaveLength(1);
    done();
  });

  it('should return an error with auth query missing', async (done) => {
    const ctx = {
      params: {},
      throw: (code, err) => ({ code, err }),
    };
    const spy = sinon.spy(ctx, 'throw');
    await malController.list(ctx);
    expect(spy.calledOnce);
    done();
  });

  it('should return an error on bad credentials', async (done) => {
    fetchMock.mock(/.+verify.+/g, fakes.malAuthFail);
    const ctx = {
      request: {
        query: {
          auth: 'test',
        },
      },
      throw: (code, err) => ({ code, err }),
    };
    const spy = sinon.spy(ctx, 'throw');
    await malController.list(ctx);
    expect(spy.calledOnce);
    expect(spy.args[0][0]).toBe(400);
    expect(spy.args[0][1]).toBe('Invalid MAL credentials.');
    done();
  });

  it('should return an error on good credentials but empty list', async (done) => {
    fetchMock.mock(/.+malappinfo.+/g, fakes.malEmptySearchResponse);
    fetchMock.mock(/.+verify.+/g, fakes.malAuthSuccess);
    const ctx = {
      params: {},
      throw: (code, err) => ({ code, err }),
    };
    const spy = sinon.spy(ctx, 'throw');
    await malController.list(ctx);
    expect(spy.calledOnce);
    expect(spy.args[0][0]).toBe(400);
    expect(spy.args[0][1]).toBe('You must supply MAL credentials.');
    done();
  });
});
