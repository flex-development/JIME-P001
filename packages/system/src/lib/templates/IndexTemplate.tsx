import { useMutatedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import { getProductCardProps } from '@system/utils'
import React from 'react'
import { Column, FlexBox, Heading, Main, Paragraph, Section } from '../atoms'
import {
  ProductCard,
  ProductCardProps,
  ProductReview,
  ProductReviewProps
} from '../molecules'
import { Carousel } from '../organisms'

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
   * Array of `ProductResource` objects as `ProductCardProps` objects.
   *
   * @default []
   */
  products?: ProductCardProps[]

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
    max_products = IndexTemplateDefaultProps.max_products,
    products = IndexTemplateDefaultProps.products,
    products_section_text,
    products_section_title = IndexTemplateDefaultProps.products_section_title,
    reviews = IndexTemplateDefaultProps.reviews,
    ...rest
  } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'template')

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
        <FlexBox className='mt-36' justify='between' wrap>
          {products.slice(0, max_products).map(card => {
            card = getProductCardProps(card)

            return (
              <Column
                className='mb-sm-24 mb-48 w-md-32 w-sm-49 w-100'
                key={card.id}
                md={3}
                sm={2}
                xs={12}
              >
                <ProductCard {...card} />
              </Column>
            )
          })}
        </FlexBox>
      </Section>

      {reviews.length !== 0 && (
        <Section id='reviews'>
          <Heading size={2}>Reviews</Heading>
          <Carousel className='mt-12' id='product-review-carousel'>
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
