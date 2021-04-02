import * as subject from '..'

/**
 * @file Unit Tests - axios-kapi
 * @module config/axios-kapi/tests/unit
 */

describe('unit:config/axios-kapi', () => {
  it('exports default function', () => {
    expect(typeof subject.default === 'function').toBeTruthy()
  })
})
