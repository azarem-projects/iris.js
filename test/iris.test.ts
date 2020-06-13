import { assert } from 'chai';
import mocha from 'mocha';
import iris from '../src/core/iris';

mocha.describe('App', () => {
  it('app should return hello', () => {
    assert.equal(iris(), 'Hello');
  })
})
