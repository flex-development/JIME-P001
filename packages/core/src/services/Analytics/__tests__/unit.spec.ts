import axios from 'axios'
import isString from 'lodash/isString'
import Subject from '..'

/**
 * @file Unit Tests - Analytics Service
 * @module services/Analytics/tests/unit
 */

const mockAxios = axios as jest.Mocked<typeof axios>

describe('unit:services/Analytics', () => {
  describe('exports', () => {
    it('class by default', () => {
      expect(Subject).toBeDefined()
      expect(Subject.constructor.name).toBe('Function')
    })

    it('class with static property `DEFAULT_PROTOCOL_VERSION`', () => {
      expect(isString(Subject.DEFAULT_PROTOCOL_VERSION)).toBeTruthy()
    })
  })

  describe('constructor', () => {
    const TRACKING_ID = process.env.TRACKING_ID || 'TRACKING_ID'

    describe('disables tracking', () => {
      it('with boolean value', () => {
        const client = new Subject(TRACKING_ID, mockAxios, false)
        expect(client.isTracking()).toBeFalsy()
      })

      it('with string value', () => {
        const client = new Subject(TRACKING_ID, mockAxios, 'false')
        expect(client.isTracking()).toBeFalsy()
      })
    })

    describe('enables tracking', () => {
      it('with boolean value', () => {
        const client = new Subject(TRACKING_ID, mockAxios, true)
        expect(client.isTracking()).toBeTruthy()
      })

      it('with string value', () => {
        const client = new Subject(TRACKING_ID, mockAxios, 'true')
        expect(client.isTracking()).toBeTruthy()
      })
    })
  })
})
