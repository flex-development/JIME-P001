import { useProductVariants } from '@kustomz/hooks'
import { act, renderHook } from '@testing-library/react-hooks'
import products from '../../__mocks__/products.mock.json'

/**
 * @file Tests - useProductVariants
 * @module tests/hooks/useProductVariants
 */

it('selected variant is an empty object ({}) when `initialVariants` is an empty array ([])', () => {
  const variants = []

  const { result } = renderHook(() => useProductVariants(variants))

  expect(result.current.selected).toMatchObject({})

  expect(result.current.options).toEqual(expect.arrayContaining(variants))
  expect(result.current.variants).toEqual(expect.arrayContaining(variants))
})

it('creates an `OptionProps` array from `initialVariants`', () => {
  const { result } = renderHook(() => useProductVariants(products[0].variants))

  const options = [
    {
      'data-available': true,
      label: 'FUNFETTI',
      value: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU2NjQ2MzkwOTA4NDM='
    },
    {
      'data-available': true,
      label: 'JELLY $LIDES',
      value: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjE5NzczMjk0MTk3OQ=='
    },
    {
      'data-available': false,
      label: 'LA $ONRISA',
      value: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjE5NzczMjk3NDc0Nw=='
    }
  ]

  expect(result.current.options).toEqual(expect.arrayContaining(options))
})

it('updates the selected variant', () => {
  const variants = products[0].variants

  const { result } = renderHook(() => useProductVariants(variants))

  expect(result.current.selected).toMatchObject(variants[0])

  act(() => {
    result.current.selectVariant(variants[1].id)
  })

  expect(result.current.selected).toMatchObject(variants[1])
})
