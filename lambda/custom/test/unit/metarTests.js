'use strict';

const metar = require('../../src/metar')
const assert = require('chai').assert

suite('Metar business logic unit tests', () => {

  test('ES language letter identification tests', () => {
    const a = metar.getLetter('es', 'alfa')
    const m = metar.getLetter('es', 'maik')
    const y = metar.getLetter('es', 'yanki')

    assert.strictEqual(a, 'A', 'alfa should be A')
    assert.strictEqual(m, 'M', 'maik should be M')
    assert.strictEqual(y, 'Y', 'yanki should be Y')
  })
})