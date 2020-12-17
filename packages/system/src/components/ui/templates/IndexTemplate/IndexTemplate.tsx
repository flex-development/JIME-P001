import { IReview } from '@flex-development/kustomzcore'
import { Heading, Main, Paragraph, Section } from '@system/components/ui/atoms'
import { ProductReview } from '@system/components/ui/molecules'
import {
  Carousel,
  ProductGrid,
  ProductGridProps
} from '@system/components/ui/organisms'
import { useSanitizedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import { uuid } from '@system/utils'

/**
 * @file Index page template
 * @module components/ui/templates/IndexTemplate/impl
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
   * Maximum number of review to display in the "Reviews" section.
   *
   * @default 5
   */
  max_reviews?: number

  /**
   * "Reviews" section title.
   *
   * @default 'Reviews'
   */
  product_reviews_title?: string

  /**
   * Array of `IProductListing` objects.
   *
   * @default []
   */
  products?: ProductGridProps['products']

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
    max_products = 3,
    max_reviews = 5,
    product_reviews_title = 'Reviews',
    products = [],
    products_section_text,
    products_section_title = 'Products',
    reviews = [],
    ...rest
  } = props

  const sanitized = useSanitizedProps<typeof rest>(rest, 'template')

  return (
    <Main {...sanitized} data-template={IndexTemplate.template_id}>
      <Section id='about'>
        <Heading className='h2'>{about_section_title}</Heading>
        <Paragraph>{about_section_text}</Paragraph>
      </Section>

      <Section id='products'>
        <Heading size={2}>{products_section_title}</Heading>
        {products_section_text && (
          <Paragraph>{products_section_text}</Paragraph>
        )}
        <ProductGrid mt={24} products={products.slice(0, max_products)} />
      </Section>

      {reviews.length !== 0 && (
        <Section id='reviews'>
          <Heading size={2}>{product_reviews_title}</Heading>
          <Carousel id='product-review-carousel' mt={12}>
            {reviews.slice(0, max_reviews).map(review => (
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
  max_reviews: 5,
  product_reviews_title: 'Reviews',
  products: [],
  products_section_title: 'Products',
  reviews: []
}

IndexTemplate.template_id = 'index'
