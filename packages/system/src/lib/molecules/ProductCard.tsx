import { useMutatedProps } from '@kustomz/hooks'
import React, { FC } from 'react'
import useBoolean from 'react-hanger/array/useBoolean'
import { Image, Product, ProductVariant } from 'shopify-buy'
import { Box, BoxProps, Item, Link, List, Paragraph } from '../atoms'

/**
 * @file Render a Product preview
 * @module lib/molecules/ProductCard
 */

/**
 * `ProductCard` component properties.
 */
export interface ProductCardProps extends Omit<BoxProps, 'id'> {
  /**
   * Unique product id.
   */
  id: Product['id']

  /**
   * All product images.
   * 
   * @default []
   */
  images?: Image[]

  /**
   * The product title.
   */
  title: Product['title']

  /**
   * Product variants.
   * 
   * @default []
   */
  variants?: Partial<ProductVariant>[]
}

/**
 * Renders a `Box` component featuring a product image, title, and price.
 */
export const ProductCard: FC<ProductCardProps> = (props: ProductCardProps) => {
  const { id, images = [], title, variants = [], ...rest } = props

  const mutatedProps = useMutatedProps<typeof rest, BoxProps>(rest, {
    card: true,
    'product-card': true
  })

  const [expanded, { toggle }] = useBoolean(false)

  const dropdownLinks = variants.map(({ title }) => ({ children: title }))

  return (
    <Box {...mutatedProps} id={id as string}>
      <Box className='card-footer'>
        <Box className='flex-column text-uppercase' flex>
          <Paragraph className='card-title product-card-title'>
            {title}
          </Paragraph>

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            aria-expanded={expanded}
            onClick={() => toggle()}
            toggle
          >
            Options
          </Link>
        </Box>

        <Paragraph className='card-text product-card-price'>
          {variants[0].formattedPrice}
        </Paragraph>
      </Box>

      {expanded && (
        <List className='dropdown-menu'>
          {dropdownLinks.map(link => <Item><Link {...link} dropdown /></Item>)}
        </List>
      )}
    </Box>
  )
}

ProductCard.defaultProps = {
  images: [],
  variants: []
}
