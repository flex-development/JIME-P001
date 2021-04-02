import PRODUCT from '@system/tests/fixtures/api/products/ash-tray'
import { act, renderHook } from '@testing-library/react-hooks'
import { useProductVariants } from '../useProductVariants'

/**
 * @file Unit Tests - useProductVariants
 * @module hooks/useProductVariants/tests/unit
 */

describe('unit:useProductVariants', () => {
  const { variants } = PRODUCT

  describe('initial state', () => {
    it('options', () => {
      const { result } = renderHook(() => useProductVariants(variants))

      const options = variants.map(({ available, id, sku, title }) => ({
        'data-available': available,
        'data-sku': sku,
        label: title,
        value: id
      }))

      expect(result.current.options).toEqual(expect.arrayContaining(options))
    })

    it('selected', () => {
      const { result } = renderHook(() => useProductVariants(variants))

      expect(result.current.selected).toMatchObject(variants[0])
    })
  })

  describe('actions', () => {
    describe('updateQuantity', () => {
      it('updates selected variant', () => {
        const { result } = renderHook(() => useProductVariants(variants))

        act(() => {
          result.current.selectVariant(variants[1].id)
        })

        expect(result.current.selected).toMatchObject(variants[1])
      })
    })
  })
})
