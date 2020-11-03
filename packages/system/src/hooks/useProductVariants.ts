import { OptionProps } from '@system/components'
import { AnyObject, ProductVariantResource } from '@system/types'
import { isNumber } from 'lodash'
import { useState } from 'react'

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
  selectVariant(id: ProductVariantResource['id']): ProductVariantResource['id']

  /**
   * The selected product variant
   */
  selected: ProductVariantResource | AnyObject

  /**
   * Array of product variant data.
   */
  variants: ProductVariantResource[]
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
 */
export const useProductVariants = (
  variants: ProductVariantResource[] = []
): UseProductVariants => {
  // Initialize selected variant state
  // The default option will be the first object in the array or {}
  const [selected, setSelected] = useState<UseProductVariants['selected']>(
    variants[0] || {}
  )

  // Get product variants as `OptionProps` for `<Select />` component
  const [options] = useState(
    variants.map(variant => {
      const { available, id, title } = variant
      return { 'data-available': available, label: title, value: id }
    })
  )

  /**
   * Updates the selected variant.
   *
   * @param id - ID of variant to select
   */
  const selectVariant = (
    id: ProductVariantResource['id']
  ): ProductVariantResource['id'] => {
    const newVariant = variants.find(v => v.id === id)

    if (newVariant && (isNumber(newVariant?.id) || newVariant?.id?.length)) {
      setSelected(newVariant)
    }

    return newVariant?.id ?? ''
  }

  return {
    options,
    selectVariant,
    selected,
    variants
  }
}
