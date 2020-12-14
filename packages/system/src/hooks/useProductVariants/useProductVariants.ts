import { AnyObject } from '@flex-development/json'
import { OptionProps } from '@system/components'
import { isNumber } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { IProductListingVariant } from 'shopify-api-node'
import { useMemoCompare } from '../useMemoCompare'

/**
 * @file Use product variants as options
 * @module hooks/useProductVariants
 */

/**
 * `useProductVariants` return type.
 */
export type UseProductVariants = {
  /**
   * Array of product variants as `OptionProps`.
   */
  options: OptionProps[]

  /**
   * Updates the selected product variant.
   *
   * @param id - ID of the variant to select
   */
  selectVariant(id: IProductListingVariant['id']): IProductListingVariant['id']

  /**
   * The selected product variant
   */
  selected: IProductListingVariant | AnyObject

  /**
   * Array of product variant data.
   */
  variants: Array<IProductListingVariant>
}

/**
 * Transforms an array of `ProductVariant` data into an array of `OptionProps`.
 *
 * The transformed array, selected variant, and a function to update the
 * selected option will be returned.
 *
 * @see https://shopify.dev/docs/storefront-api/reference/object/productvariant
 *
 * @param variants - Array of `ProductVariant` data
 * @param active - Index of active item
 */
export const useProductVariants = (
  variants: Array<IProductListingVariant> = [],
  active = 0
): UseProductVariants => {
  // Initialize selected variant state
  // The default option will be the first object in the array or {}
  const [selected, setSelected] = useState<UseProductVariants['selected']>(
    variants[active < 0 ? 0 : active] || {}
  )

  // Get reference to product variants
  const _variants = useMemoCompare<typeof variants>(variants)

  /**
   * Updates the selected variant.
   *
   * @param id - ID of variant to select
   */
  const selectVariant = (
    id: IProductListingVariant['id']
  ): IProductListingVariant['id'] => {
    const newVariant = _variants.find(v => v.id === id)

    if (newVariant && isNumber(newVariant?.id)) setSelected(newVariant)

    return newVariant?.id ?? -1
  }

  return {
    options: useMemo<UseProductVariants['options']>(() => {
      return _variants.map(variant => {
        const { available, id, sku, title } = variant

        return {
          'data-available': available,
          'data-sku': sku,
          label: title,
          value: id
        }
      })
    }, [_variants]),
    selectVariant: useCallback(selectVariant, [_variants]),
    selected,
    variants
  }
}
