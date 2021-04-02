import formatPrice from '..'

/**
 * @file Unit Tests - formatPrice
 * @module utils/formatPrice/tests/unit
 */

describe('unit:formatPrice', () => {
  describe('positive number', () => {
    it('number', () => {
      const value = 5
      expect(formatPrice(value)).toEqual(`$${value}.00`)
    })

    it('stringish number', () => {
      const value = '4'
      expect(formatPrice(value)).toEqual(`$${value}.00`)
    })
  })

  describe('negative number', () => {
    it('number', () => {
      const value = -1
      expect(formatPrice(value)).toEqual(`$${value * -1}.00`)
    })

    it('stringish number', () => {
      const value = '-3'
      expect(formatPrice(value)).toEqual(`$${JSON.parse(value) * -1}.00`)
    })
  })
})
