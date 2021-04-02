import subject from '..'
import type { Person } from './__fixtures__/people-array'
import {
  PEOPLE_ARRAY,
  PEOPLE_ARRAY_ONE_SKIP,
  PEOPLE_OBJECT_ID_KEY as POIK
} from './__fixtures__/people-array'

/**
 * @file Unit Tests - objectFromArray
 * @module utils/objectFromArray/tests/unit
 */

describe('unit:utils/objectFromArray', () => {
  it('exports default function', () => {
    expect(typeof subject === 'function').toBeTruthy()
  })

  it('combines array of objects into a single object', () => {
    // Create object from array
    const result = subject<Person>(PEOPLE_ARRAY, POIK)
    const result_keys = Object.keys(result)

    // Check that number of object keys matches length of array
    expect(result_keys.length).toBe(PEOPLE_ARRAY.length)

    // Check that chosen object key maps to the correct array item
    result_keys.forEach((key, index) => {
      expect(key).toBe(PEOPLE_ARRAY[index][POIK])
    })
  })

  it('skips array items without a valid object id key', () => {
    // Create object from array
    const result = subject<Person>(PEOPLE_ARRAY_ONE_SKIP, POIK)
    const result_keys = Object.keys(result)

    // Check that number of object keys is less than length of array
    expect(result_keys.length).toBe(PEOPLE_ARRAY_ONE_SKIP.length - 1)

    // Check that each object key is defined and non-empty
    result_keys.forEach(key => expect(key.length).toBeTruthy())
  })
})
