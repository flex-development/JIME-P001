import isPlainObject from 'lodash/isPlainObject'
import subject from '..'

/**
 * @file Unit Tests - vercel-env
 * @module config/vercel-env/tests/unit
 */

describe('unit:config/vercel-env', () => {
  it('exports default object', () => {
    expect(isPlainObject(subject)).toBeTruthy()
  })

  it('exports with `branch` property', () => {
    expect(typeof subject.branch === 'string').toBeTruthy()
    expect(subject.branch).toBe(process.env.VERCEL_GIT_COMMIT_REF)
  })

  it('exports with `commit` property', () => {
    expect(typeof subject.commit === 'string').toBeTruthy()
    expect(subject.commit).toBe(process.env.VERCEL_GIT_COMMIT_SHA)
  })

  it('exports with `env` property', () => {
    expect(typeof subject.env === 'string').toBeTruthy()
    expect(subject.env).toBe(process.env.VERCEL_ENV)
  })
})
