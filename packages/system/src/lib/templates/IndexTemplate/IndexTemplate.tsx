import type { IMetafield } from '@core/types'
import objectFromArray from '@core/utils/objectFromArray'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Heading } from '@system/lib/atoms/Heading'
import type { MainProps } from '@system/lib/atoms/Main'
import { Main } from '@system/lib/atoms/Main'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import { Section } from '@system/lib/atoms/Section'
import { Carousel } from '@system/lib/molecules/Carousel'
import { ProductReview } from '@system/lib/molecules/ProductReview'
import { ProductGrid } from '@system/lib/organisms/ProductGrid'
import type { TC } from '@system/types'
import uniqueId from 'lodash/uniqueId'
import type { IndexTemplateProps } from './IndexTemplate.props'

/**
 * @file Implementation - IndexTemplate
 * @module lib/templates/IndexTemplate/impl
 */

/**
 * Displays a quick blurb about the shop owner, a product grid, and a product
 * review carousel.
 *
 * **Currently, the product reviews section in only visible in `development`
 * environments**.
 *
 * Renders a `Main` component with the classes `template` and `index-template`,
 * as well as the attribute `data-template='index'`.
 */
export const IndexTemplate: TC<IndexTemplateProps> = props => {
  const { page, products = [], reviews = [], ...rest } = props

  const sanitized = useSanitizedProps<'main', MainProps>(rest, 'index-template')

  const {
    about_section_text: { value: about_section_text },
    about_section_title: { value: about_section_title = 'About Morena' },
    max_products: { value: max_products = 3 },
    max_reviews: { value: max_reviews = 5 },
    products_section_text: { value: products_section_text },
    products_section_title: { value: products_section_title = 'Products' },
    reviews_section_title: { value: reviews_section_title = 'Reviews' }
  } = objectFromArray<IMetafield>(page.metafield ?? [], 'key')

  return (
    <Main {...sanitized} data-template={IndexTemplate.template_id}>
      <Section $content id='about'>
        <Heading className='template-heading'>{about_section_title}</Heading>
        <Paragraph>{about_section_text}</Paragraph>
      </Section>

      <Section $content id='products'>
        <Heading $size={2} className='template-heading'>
          {products_section_title}
        </Heading>
        {products_section_text && (
          <Paragraph>{products_section_text}</Paragraph>
        )}
        <ProductGrid
          className='index-template-grid'
          max={max_products as number}
          products={products}
        />
      </Section>

      {/* ONLY SHOW PRODUCT REVIEWS SECTION IN DEVELOPMENT */}
      {process.env.NODE_ENV === 'development' && reviews.length !== 0 && (
        <Section $content id='reviews'>
          <Heading $size={2} className='template-heading'>
            {reviews_section_title}
          </Heading>
          <Carousel
            className='index-template-carousel'
            id='product-review-carousel'
            max={max_reviews as number}
          >
            {reviews.map(review => (
              <ProductReview key={uniqueId('product-review')} review={review} />
            ))}
          </Carousel>
        </Section>
      )}
    </Main>
  )
}

IndexTemplate.displayName = 'IndexTemplate'

IndexTemplate.defaultProps = {
  products: [],
  reviews: []
}

IndexTemplate.template_id = 'index'
