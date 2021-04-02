import SUBJECT from '..'

/**
 * @file Unit Tests - Algolia Search Client
 * @module lib/config/algolia/tests/unit
 */

describe('unit:config/algolia', () => {
  it('initializes algolia search client', () => {
    expect(SUBJECT.appId).toBeDefined()
    expect(SUBJECT.transporter).toBeDefined()

    expect(SUBJECT.appId).toBe(process.env.ALGOLIA_APP_ID)
  })
})
