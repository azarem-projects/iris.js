import { assert } from 'chai';
import mocha from 'mocha';
import iris from '../src/iris';

mocha.describe('App', () => {
  it('app should return hello', () => {
    assert.equal(iris(), 'Hello');
  })
})
