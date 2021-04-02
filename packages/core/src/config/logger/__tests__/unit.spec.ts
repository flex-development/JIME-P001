import subject from '..'
import vercel from '../../vercel-env'

/**
 * @file Unit Tests - logger
 * @module config/logger/tests/unit
 */

describe('unit:config/logger', () => {
  const LOG_ID = 'test-logger'

  it('exports default function', () => {
    expect(typeof subject === 'function').toBeTruthy()
  })

  it('returns pino logger bound with log id and vercel env object', () => {
    const bindings = subject(LOG_ID).bindings()

    expect(bindings.log).toBe(LOG_ID)
    expect(bindings.vercel).toMatchObject(vercel)
  })
})
