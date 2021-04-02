import sanitizeQuantity from '..'

/**
 * @file Unit Tests - sanitizeQuantity
 * @module utils/sanitizeQuantity/tests/unit
 */

describe('unit:sanitizeQuantity', () => {
  const BAD_ARGS = [null, undefined, [], {}]
  const ZERO = 0

  const quantity = 13
  const quantity_negative = quantity * -1

  describe('converts value into product quantity', () => {
    describe('typeof value === "boolean"', () => {
      it('false', () => {
        expect(sanitizeQuantity(false)).toBe(ZERO)
      })

      it('true', () => {
        expect(sanitizeQuantity(true)).toBe(1)
      })
    })

    describe('typeof value === "number"', () => {
      it('negative', () => {
        expect(sanitizeQuantity(quantity_negative)).toBe(ZERO)
      })

      it('positive', () => {
        expect(sanitizeQuantity(quantity)).toBe(quantity)
      })
    })

    describe('typeof value === "string"', () => {
      describe('stringish number', () => {
        it('negative', () => {
          expect(sanitizeQuantity(`${quantity_negative}`)).toBe(ZERO)
        })

        it('positive', () => {
          expect(sanitizeQuantity(`${quantity}`)).toBe(quantity)
        })
      })

      it('stringish non-number', () => {
        BAD_ARGS.forEach(arg => expect(sanitizeQuantity(`${arg}`)).toBe(ZERO))
      })
    })

    it('typeof value !== "number" && typeof value !== "string"', () => {
      BAD_ARGS.forEach(arg => expect(sanitizeQuantity(arg)).toBe(ZERO))
    })
  })
})
