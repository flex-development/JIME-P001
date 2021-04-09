import type { IProductListingVariant } from '@core/types'
import { useProductVariants } from '@system/hooks/useProductVariants'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { BoxProps } from '@system/lib/atoms/Box'
import { Box } from '@system/lib/atoms/Box'
import { Link } from '@system/lib/atoms/Link'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import { ProductImage } from '@system/lib/atoms/ProductImage'
import { DropdownMenu } from '@system/lib/molecules'
import type { EventHandlers } from '@system/types'
import type { FC } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useBoolean from 'react-hanger/array/useBoolean'
import type { ProductCardProps } from '././ProductCard.props'

/**
 * @file Implementation - ProductCard
 * @module lib/molecules/ProductCard/impl
 */

/**
 * Displays a product preview. The product image, title, and price will be
 * shown. Users can switch between variants using a `Dropdown` component.
 *
 * Renders a `Box` component with the class `product-card`.
 */
export const ProductCard: FC<ProductCardProps> = props => {
  const { product_link = {}, product, ...rest } = props

  // Get component properties
  const sanitized = useSanitizedProps<'div', BoxProps>(
    { ...rest, id: `product-card-${product.product_id}` },
    'product-card'
  )

  // Use product variants as options
  const { selectVariant, selected } = useProductVariants(product.variants)

  // Toggle dropdown menu visibility
  const [expanded, { toggle }] = useBoolean(false)

  // Maintain product URL state
  const initial_url = product_link.href || `products/${product.handle}`
  const [url, setURL] = useState(initial_url)

  // Update product url when new variant is selected
  useEffect(() => {
    const default_variant = selected.sku === product.variants[0].sku
    setURL(default_variant ? initial_url : `${initial_url}?sku=${selected.sku}`)
  }, [
    initial_url,
    product.handle,
    product_link.href,
    selected.sku,
    product.variants
  ])

  /**
   * Toggles the dropdown visibility.
   *
   * @param {EventHandlers.Click.Anchor} event - `click` event
   * @return {void}
   */
  const onClickProduct = (event: EventHandlers.Click.Anchor): void => {
    event.preventDefault()
    return toggle()
  }

  /**
   * Selects a product variant title from the dropdown and toggles the dropdown
   * visibility.
   *
   * @param {number} id - ID of product variant to select from dropdown
   * @return {void}
   */
  const onClickDropItem = (id: IProductListingVariant['id']): void => {
    selectVariant(id) && toggle()
  }

  /* Callback version of `onClickProduct` */
  const onClickProductCB = useCallback(onClickProduct, [toggle])

  /* Callback version of `onClickDropItem` */
  const onClickDropItemCB = useCallback(onClickDropItem, [
    selectVariant,
    toggle
  ])

  // Get array of `DropdownMenu` items
  const dropdown_variants = useMemo(() => {
    return product.variants.filter(variant => {
      return variant.title !== selected.title
    })
  }, [product.variants, selected.title])

  // Get `Dropdown` toggle link id
  const DROPDOWN_ID = `product-card-dropdown-toggle-${product.product_id}`

  return (
    <Box {...sanitized}>
      <Link
        className='product-card-link-img'
        href={url}
        name={`${product.title} - ${selected.title} image`}
        target='_blank'
      >
        <ProductImage loading='eager' product={product} variant={selected} />
      </Link>

      <Box className='product-card-footer'>
        <Box>
          <Link className='product-card-title' href={url} target='_blank'>
            {product.title}
          </Link>

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            $dropdown='toggle'
            aria-expanded={expanded}
            aria-label='Product card dropdown toggle'
            className='product-card-dropdown-toggle'
            id={DROPDOWN_ID}
            onClick={(e: EventHandlers.Click.Anchor) => onClickProductCB(e)}
          >
            {selected.title}
          </Link>
        </Box>

        <Paragraph className='product-card-price'>
          {selected.available ? `$${selected.price}` : 'Out of Stock'}
        </Paragraph>
      </Box>

      <DropdownMenu
        $items={dropdown_variants.map(({ id, title }) => ({
          $dropdown: true,
          children: title,
          onClick: () => onClickDropItemCB(id)
        }))}
        aria-labelledby={DROPDOWN_ID}
        className='product-card-dropdown-menu'
        expanded={expanded}
      />
    </Box>
  )
}

ProductCard.displayName = 'ProductCard'

ProductCard.defaultProps = {
  product_link: {}
}
