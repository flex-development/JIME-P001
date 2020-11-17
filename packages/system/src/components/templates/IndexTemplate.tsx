import { IReview } from '@flex-development/types'
import { useMutatedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import { uuid } from '@system/utils'
import React from 'react'
import { IProductListing } from 'shopify-api-node'
import { Heading, Main, Paragraph, Section } from '../atoms'
import { ProductReview } from '../molecules'
import { Carousel, ProductGrid } from '../organisms'

/**
 * @file Index page template
 * @module components/templates/IndexTemplate
 */

export interface IndexTemplateProps extends MutatedProps {
  /**
   * Text to display in the "About" section.
   *
   */
  about_section_text: string

  /**
   * "About" section title.
   *
   * @default 'About Morena'
   */
  about_section_title?: string

  /**
   * Maximum number of products to display in the "Products" section.
   *
   * @default 3
   */
  max_products?: number

  /**
   * Array of `IProductListing` objects.
   *
   * @default []
   */
  products?: Array<IProductListing>

  /**
   * Text to display in the "Products" section.
   *
   */
  products_section_text?: string

  /**
   * "Products" section title.
   *
   * @default 'Products'
   */
  products_section_title?: string

  /**
   * Array of `IReview` objects.
   *
   * @default []
   */
  reviews?: Array<IReview>
}

/**
 * Displays a quick blurb about the shop owner, a product grid, and a product
 * review carousel.
 *
 * Renders a `Main` component with the class `template` and attribute
 * `data-template='index'`.
 *
 * **TODO**:
 *
 * - Update usage instructions
 */
export const IndexTemplate: TC<IndexTemplateProps> = (
  props: IndexTemplateProps
) => {
  const {
    about_section_text,
    about_section_title = 'About Morena',
    max_products: max = 3,
    products = [],
    products_section_text,
    products_section_title = 'Products',
    reviews = [],
    ...rest
  } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'template')
  const display_products = max > 0 ? products.slice(0, max) : products

  return (
    <Main {...mutated} data-template={IndexTemplate.template_id}>
      <Section id='about'>
        <Heading size={2}>{about_section_title}</Heading>
        <Paragraph>{about_section_text}</Paragraph>
      </Section>

      <Section id='products'>
        <Heading size={2}>{products_section_title}</Heading>
        {products_section_text && (
          <Paragraph>{products_section_text}</Paragraph>
        )}
        <ProductGrid mt={24} products={display_products} />
      </Section>

      {reviews.length !== 0 && (
        <Section id='reviews'>
          <Heading size={2}>Reviews</Heading>
          <Carousel id='product-review-carousel' mt={12}>
            {reviews.map(review => (
              <ProductReview key={uuid()} review={review} />
            ))}
          </Carousel>
        </Section>
      )}
    </Main>
  )
}

IndexTemplate.displayName = 'IndexTemplate'

IndexTemplate.defaultProps = {
  about_section_title: 'About Morena',
  max_products: 3,
  products: [],
  products_section_title: 'Products',
  reviews: []
}

IndexTemplate.template_id = 'index'
