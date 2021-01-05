import formatPrice from './formatPrice'

/**
 * @file Tests - formatPrice
 * @module utils/formatPrice/spec
 */

describe('formatPrice', () => {
  it('converts number into money string', () => {
    const value = 5
    expect(formatPrice(value)).toEqual(`$${value}.00`)
  })

  it('converts stringish number into money string', () => {
    const value = '4'
    expect(formatPrice(value)).toEqual(`$${value}.00`)
  })

  it('converts negative number into money string', () => {
    const value = -1
    expect(formatPrice(value)).toEqual(`$${value * -1}.00`)
  })

  it('converts negative stringish number into money string', () => {
    const value = '-3'
    expect(formatPrice(value)).toEqual(`$${JSON.parse(value) * -1}.00`)
  })
})
