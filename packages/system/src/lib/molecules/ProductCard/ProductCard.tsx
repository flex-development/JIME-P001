import { IProductListingVariant } from '@flex-development/kustomzcore/types'
import getProductImage from '@flex-development/kustomzcore/utils/getProductImage'
import { IMAGE_PLACEHOLDER_URL } from '@system/config/constants'
import { useMemoCompare } from '@system/hooks/useMemoCompare'
import { useProductVariants } from '@system/hooks/useProductVariants'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Box, BoxProps } from '@system/lib/atoms/Box'
import { Image, ImageProps } from '@system/lib/atoms/Image'
import { Link } from '@system/lib/atoms/Link'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import { EventHandlers } from '@system/types'
import dynamic from 'next/dynamic'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import useBoolean from 'react-hanger/array/useBoolean'
import { ProductCardProps } from './ProductCard.props'
/**
 * @file Implementation - ProductCard
 * @module lib/molecules/ProductCard/impl
 */

const DropdownMenu = dynamic(async () => {
  return (await import('../DropdownMenu')).DropdownMenu
})

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
  const { selectVariant, selected = {} } = useProductVariants(product.variants)

  // Toggle dropdown menu visibility
  const [expanded, { toggle }] = useBoolean(false)

  // Maintain product URL state
  const initial_url = product_link.href || `products/${product.handle}`
  const [url, setURL] = useState(initial_url)

  // Get product variant display image
  const image_alt = `${product.title} - ${selected.title}`
  const image = useMemoCompare<ImageProps>(
    getProductImage(
      selected.image_id,
      product.images,
      selected.image_id === null,
      { alt: image_alt, src: IMAGE_PLACEHOLDER_URL }
    ) as ImageProps
  )

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
   * @param event - `click` event from `<a>` element
   */
  const onClickProduct = (event: EventHandlers.Click.Anchor) => {
    event.preventDefault()
    return toggle()
  }

  /**
   * Selects a product variant title from the dropdown and toggles the dropdown
   * visibility.
   *
   * @param id - ID of product variant to select from dropdown
   */
  const onClickDropItem = (id: IProductListingVariant['id']) => {
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
      <Link className='product-card-link-img' href={url} target='_blank'>
        <Image {...image} className='product-card-img' loading='eager' />
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
