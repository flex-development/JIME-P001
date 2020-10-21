import { ProductResource } from '@flex-development/kustomtypez'
import { useMutatedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import React from 'react'
import { Heading, Main, Paragraph, Section } from '../atoms'
import { ProductReview, ProductReviewProps } from '../molecules'
import { Carousel, ProductGrid } from '../organisms'

/**
 * @file Index page template
 * @module lib/templates/IndexTemplate
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
   * Array of `ProductResource` objects.
   *
   * @default []
   */
  products?: ProductResource[]

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
   * Array of `StampedProductReviewEntity` objects as `ProductReviewProps`
   * objects.
   *
   * @default []
   */
  reviews?: ProductReviewProps[]
}

export const IndexTemplateDefaultProps = {
  about_section_title: 'About Morena',
  max_products: 3,
  products: [],
  products_section_title: 'Products',
  reviews: []
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
    about_section_title = IndexTemplateDefaultProps.about_section_title,
    max_products: max = IndexTemplateDefaultProps.max_products,
    products = IndexTemplateDefaultProps.products,
    products_section_text,
    products_section_title = IndexTemplateDefaultProps.products_section_title,
    reviews = IndexTemplateDefaultProps.reviews,
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
        <ProductGrid mt={36} products={display_products} />
      </Section>

      {reviews.length !== 0 && (
        <Section id='reviews'>
          <Heading size={2}>Reviews</Heading>
          <Carousel id='product-review-carousel' mt={12}>
            {reviews.map(review => (
              <ProductReview {...review} key={review.id} />
            ))}
          </Carousel>
        </Section>
      )}
    </Main>
  )
}

IndexTemplate.template_id = 'index'

IndexTemplate.defaultProps = IndexTemplateDefaultProps
