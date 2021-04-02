import type { FlexDirection, GridColumnSpan, UCCR } from '@system/types'
import genclasses from '..'

/**
 * @file Unit Tests - genclasses
 * @module utils/genclasses/tests/unit
 */

describe('unit:genclasses', () => {
  it('returns an array of responsive grid column classes', () => {
    const utilties: UCCR<boolean | GridColumnSpan> = {
      sm: 4,
      xs: true
    }

    const classes = genclasses('col', utilties)

    const expected = ['col', 'sm:col-4', '', '', '', '']

    expect(classes).toEqual(expect.arrayContaining(expected))
  })

  it('returns an array of responsive flex-direction classes', () => {
    const utilties: UCCR<FlexDirection> = {
      sm: 'row',
      xs: 'column'
    }

    const classes = genclasses('flex', utilties)

    const expected = ['flex-column', 'sm:flex-row', '', '', '']

    expect(classes).toEqual(expect.arrayContaining(expected))
  })
})
