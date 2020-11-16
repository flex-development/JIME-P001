import { ProductResource } from '@flex-development/types'
import { useMutatedProps, useProductVariants } from '@system/hooks'
import { EventHandlers } from '@system/types'
import React, { FC, useEffect, useState } from 'react'
import useBoolean from 'react-hanger/array/useBoolean'
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

/**
 * `ProductCard` component properties.
 */
export interface ProductCardProps extends BoxProps {
  /**
   * Product handle.
   */
  handle: ProductResource['handle']

  /**
   * Unique product id.
   */
  id: ProductResource['id']

  /**
   * The product title.
   */
  title: ProductResource['title']

  /**
   * Product variants.
   *
   * @default []
   */
  variants?: ProductResource['variants']
}

/**
 * Displays a product image, title, and price.
 *
 * Renders a `Box` component with the class `product-card`.
 */
export const ProductCard: FC<ProductCardProps> = (props: ProductCardProps) => {
  const { handle, title, variants = [], ...rest } = props

  const mutated = useMutatedProps<typeof rest, BoxProps>(rest, {
    card: true,
    'product-card': true
  })

  // Use product variants as options
  const { selectVariant, selected = {} } = useProductVariants(variants)

  // Toggle dropdown menu visibility
  const [expanded, { toggle }] = useBoolean(false)

  // Maintain product URL state
  const [url, setURL] = useState(`products/${handle}`)

  useEffect(() => {
    if (!selected?.sku) return

    const default_selected = selected.sku === variants[0].sku
    const base = `products/${handle}`

    setURL(default_selected ? base : `${base}?style=${selected.sku}`)
  }, [handle, selected.sku, variants])

  const ProductLink: FC<LinkProps> = ({ children, className }) => (
    <Link className={className} href={url} target='_blank'>
      {children}
    </Link>
  )

  return (
    <Box {...mutated}>
      <Box>
        <ProductLink className='d-inline-block'>
          <Image
            {...selected.image}
            alt={selected.image?.alt || `${title} - ${selected.title}`}
            className='product-card-img card-img-top'
            fluid
          />
        </ProductLink>
      </Box>

      <FlexBox align='center' className='card-footer' justify='between'>
        <FlexBox direction='column'>
          <ProductLink className='card-title product-card-title'>
            {title}
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
          {variants.map(({ id, title }) => {
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

ProductCard.defaultProps = {
  variants: []
}
