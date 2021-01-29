import { PRODUCTS } from '@system-mocks/utils'
import { act, renderHook } from '@testing-library/react-hooks'
import { useProductVariants } from './useProductVariants'

/**
 * @file Tests - useProductVariants
 * @module tests/hooks/useProductVariants
 */

describe('useProductVariants', () => {
  const { variants } = PRODUCTS[0]

  it('creates an `OptionProps` array from `initialVariants`', () => {
    const { result } = renderHook(() => useProductVariants(variants))

    const options = variants.map(({ available, id, sku, title }) => ({
      'data-available': available,
      'data-sku': sku,
      label: title,
      value: id
    }))

    expect(result.current.options).toEqual(expect.arrayContaining(options))
  })

  it('updates the selected variant', () => {
    const { result } = renderHook(() => useProductVariants(variants))

    expect(result.current.selected).toMatchObject(variants[0])

    act(() => {
      result.current.selectVariant(variants[1].id)
    })

    expect(result.current.selected).toMatchObject(variants[1])
  })
})
