'use strict';

const metar = require('../../src/metar')
const assert = require('chai').assert

suite('Metar business logic unit tests', () => {

  test('ES language letter identification tests', () => {
    const a = metar.getLetter('es', 'alfa')
    assert.strictEqual(a, 'A', 'alfa should be A')
  })
})