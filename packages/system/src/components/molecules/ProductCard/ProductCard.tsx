import {
  Box,
  BoxProps,
  FlexBox,
  Image,
  ImageProps,
  Link,
  LinkProps,
  Paragraph
} from '@system/components/atoms'
import { useProductVariants, useSanitizedProps } from '@system/hooks'
import { MemoCompare, useMemoCompare } from '@system/hooks/useMemoCompare'
import { EventHandlers } from '@system/types'
import { getProductVariantImage } from '@system/utils'
import { isEqual } from 'lodash'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import useBoolean from 'react-hanger/array/useBoolean'
import { IProductListing, IProductListingVariant } from 'shopify-api-node'
import { DropdownMenu } from '../DropdownMenu'

/**
 * @file Display a product preview
 * @module components/molecules/ProductCard/impl
 */

export interface ProductCardProps extends BoxProps {
  /**
   * The `IProductListing` object.
   */
  product: IProductListing

  /**
   * Product `Link` component props.
   *
   * @default {}
   */
  product_link?: LinkProps
}

/**
 * Displays a product image, title, and price.
 *
 * Renders a `Box` component with the class `product-card`.
 */
export const ProductCard: FC<ProductCardProps> = (props: ProductCardProps) => {
  const { product_link = {}, product, ...rest } = props

  const _compare: MemoCompare = (previous, next) => isEqual(previous, next)

  const sanitized = useSanitizedProps<typeof rest, BoxProps>(rest, {
    card: true,
    'product-card': true
  })

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
    getProductVariantImage(selected.image_id, product.images, image_alt),
    _compare
  )

  // Update product url when new variant is selected
  useEffect(() => {
    if (!selected?.sku) return

    const default_selected = selected.sku === product.variants[0].sku
    const base = product_link.href || `products/${product.handle}`

    setURL(default_selected ? base : `${base}?sku=${selected.sku}`)
  }, [product.handle, product_link.href, selected.sku, product.variants])

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
  const _onClickProduct = useCallback(onClickProduct, [toggle])

  /* Callback version of `onClickDropItem` */
  const _onClickDropItem = useCallback(onClickDropItem, [selectVariant, toggle])

  const dropdown_variants = useMemo(() => {
    return product.variants.filter(variant => {
      return variant.title !== selected.title
    })
  }, [product.variants, selected.title])

  return (
    <Box {...sanitized} id={`product-card-${product.product_id}`}>
      <Link className='d-inline-block' href={url} target='_blank'>
        <Image {...image} className='product-card-img card-img-top' fluid />
      </Link>

      <FlexBox align='center' className='card-footer' justify='between'>
        <FlexBox direction='column'>
          <Link
            className='card-title product-card-title'
            href={url}
            target='_blank'
          >
            {product.title}
          </Link>

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            aria-expanded={expanded}
            onClick={(e: EventHandlers.Click.Anchor) => _onClickProduct(e)}
            toggle
          >
            {selected.title}
          </Link>
        </FlexBox>

        <Paragraph className='card-text product-card-price'>
          {selected.available ? `$${selected.price}` : 'Out of Stock'}
        </Paragraph>
      </FlexBox>

      <DropdownMenu
        items={dropdown_variants.map(({ id, title }) => ({
          children: title,
          onClick: () => _onClickDropItem(id)
        }))}
        open={expanded}
      />
    </Box>
  )
}

ProductCard.displayName = 'ProductCard'

ProductCard.defaultProps = {
  product_link: {}
}
