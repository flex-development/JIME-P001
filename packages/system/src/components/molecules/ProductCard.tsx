import { useMutatedProps, useProductVariants } from '@system/hooks'
import { EventHandlers } from '@system/types'
import { getProductVariantImage } from '@system/utils'
import React, { FC, useEffect, useState } from 'react'
import useBoolean from 'react-hanger/array/useBoolean'
import { IProductListing } from 'shopify-api-node'
import {
  Box,
  BoxProps,
  FlexBox,
  Image,
  Item,
  Link,
  LinkProps,
  List,
  Paragraph
} from '../atoms'

/**
 * @file Display a product preview
 * @module components/molecules/ProductCard
 */

export interface ProductCardProps extends BoxProps {
  /**
   * The `IProductListing` object.
   */
  product: IProductListing
}

/**
 * Displays a product image, title, and price.
 *
 * Renders a `Box` component with the class `product-card`.
 */
export const ProductCard: FC<ProductCardProps> = (props: ProductCardProps) => {
  const { product, ...rest } = props

  const mutated = useMutatedProps<typeof rest, BoxProps>(rest, {
    card: true,
    'product-card': true
  })

  // Use product variants as options
  const { selectVariant, selected = {} } = useProductVariants(product.variants)

  // Toggle dropdown menu visibility
  const [expanded, { toggle }] = useBoolean(false)

  // Maintain product URL state
  const [url, setURL] = useState(`products/${product.handle}`)

  // Update product url when new variant is selected
  useEffect(() => {
    if (!selected?.sku) return

    const default_selected = selected.sku === product.variants[0].sku
    const base = `products/${product.handle}`

    setURL(default_selected ? base : `${base}?sku=${selected.sku}`)
  }, [product.handle, selected.sku, product.variants])

  // Get product variant display image
  const image = getProductVariantImage(
    selected.image_id,
    product.images,
    `${product.title} - ${selected.title}`
  )

  /**
   * Helper `Link` component with preset href value.
   *
   * @param param0 - Component properties
   * @param param0.children - Link text
   * @param param0.className - CSS classes to apply
   * @returns Link to product
   */
  const ProductLink: FC<LinkProps> = ({ children, className }) => (
    <Link className={className} href={url} target='_blank'>
      {children}
    </Link>
  )

  return (
    <Box {...mutated} id={`product-card-${product.product_id}`}>
      <Box>
        <ProductLink className='d-inline-block'>
          <Image {...image} className='product-card-img card-img-top' fluid />
        </ProductLink>
      </Box>

      <FlexBox align='center' className='card-footer' justify='between'>
        <FlexBox direction='column'>
          <ProductLink className='card-title product-card-title'>
            {product.title}
          </ProductLink>

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            aria-expanded={expanded}
            onClick={(event: EventHandlers.Click.Anchor) => {
              event.preventDefault()
              return toggle()
            }}
            toggle
          >
            {selected.title}
          </Link>
        </FlexBox>

        <Paragraph className='card-text product-card-price'>
          {selected.available ? `$${selected.price}` : 'Out of Stock'}
        </Paragraph>
      </FlexBox>

      {expanded && (
        <List className='dropdown-menu show'>
          {product.variants.map(({ id, title }) => {
            if (title === selected.title) return null

            return (
              <Item
                dropdown
                className='dropdown-item'
                key={id}
                onClick={() => selectVariant(id) && toggle()}
              >
                {title}
              </Item>
            )
          })}
        </List>
      )}
    </Box>
  )
}

ProductCard.displayName = 'ProductCard'

ProductCard.defaultProps = {}
