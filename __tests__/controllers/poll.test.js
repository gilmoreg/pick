/* globals describe, it, expect */
const sinon = require('sinon');
const pollController = require('../../controllers/poll');
const app = require('../../server');
const request = require('supertest').agent(app.listen());

describe('Poll Controller', () => {
  it('GET / should render home.pug', async (done) => {
    const result = await request.get('/');
    expect(result.statusCode).toBe(200);
    expect(result.text).toEqual(expect.stringContaining('Create a Poll'));
    done();
  });

  it('renders the home page if no name param', async (done) => {
    const ctx = {
      params: {},
      render: str => str,
    };
    const result = await pollController.poll(ctx);
    expect(result).toBe('home');
    done();
  });

  it('renders the poll page with the user in context on a good name', async (done) => {
    const ctx = {
      params: { name: 'test' },
      render: str => ({ str, user: 'test' }),
    };
    const result = await pollController.poll(ctx);
    expect(result.str).toBe('poll');
    expect(result.user).toBe('test');
    done();
  });

  it('throws an error when no params object on ctx', async (done) => {
    const ctx = {
      render: str => str,
      throw: (code, err) => ({ code, err }),
    };
    const spy = sinon.spy(ctx, 'throw');
    await pollController.poll(ctx);
    expect(spy.calledOnce);
    done();
  });
});
