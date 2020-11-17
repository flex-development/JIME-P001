import { ANYTHING, IReview } from '@flex-development/types'
import { useMutatedProps } from '@system/hooks'
import { EventHandlers, MutatedProps, TC } from '@system/types'
import { uuid } from '@system/utils'
import { chunk } from 'lodash'
import React, { useState } from 'react'
import { IProductListing, IProductListingVariant } from 'shopify-api-node'
import { Button, FlexBox, Heading, LinkProps, Main, Section } from '../atoms'
import { ProductBreadcrumb, ProductReview } from '../molecules'
import { AddToCartForm, AddToCartFormProps, Carousel } from '../organisms'

/**
 * @file Product page template
 * @module components/templates/ProductTemplate
 */

export interface ProductTemplateProps extends MutatedProps {
  /**
   * Title and link of the collection the `product` belongs to.
   */
  collection: LinkProps

  /**
   * Fires when the user clicks the "Add to Cart" button.
   */
  handleAddToCart?: AddToCartFormProps['handleSubmit']

  /**
   * Fires when the user clicks the "Submit Review" button.
   */
  handleSubmitReview?: (event: EventHandlers.Click.Button) => ANYTHING

  /**
   * Shopify `IProductListing` object.
   */
  product: IProductListing

  /**
   * Array of product reviews for `product`.
   *
   * @default []
   */
  reviews?: Array<IReview>

  /**
   * Maximum number of product reviews to show in a group.
   *
   * @default 2
   */
  reviews_chunk_max?: number
}

/**
 * Displays information about a Shopify product resource. Users can add the
 * product to their cart, browse product reviews, as well as leave reviews.
 *
 * Renders a `Main` component with the class `template` and attribute
 * `data-template='product'`.
 */
export const ProductTemplate: TC<ProductTemplateProps> = (
  props: ProductTemplateProps
) => {
  const {
    collection,
    handleAddToCart,
    handleSubmitReview = (event: EventHandlers.Click.Button) => {
      event.preventDefault()
      console.log('TODO: ProductTemplate.handleSubmitReview')
    },
    product,
    reviews,
    reviews_chunk_max,
    ...rest
  } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'template')

  // Selected variant
  const [variant, setVariant] = useState(product.variants[0])

  // Paginate product reviews
  const review_chunks = chunk(reviews, reviews_chunk_max)

  /**
   * Updates the selected product variant state.
   *
   * @param id - ID of newly selected variant
   */
  const handleVariant = (id: IProductListingVariant['id']) => {
    const new_variant = product.variants.find(v => v.id === id)
    if (new_variant) setVariant(new_variant)
  }

  return (
    <Main {...mutated} data-template={ProductTemplate.template_id}>
      <ProductBreadcrumb
        collection={collection}
        product={product.title}
        variant={variant.title}
      />

      <AddToCartForm
        handleSubmit={handleAddToCart}
        handleVariant={handleVariant}
        product={product}
      />

      <Section id='reviews' mt={{ md: 36, sm: 48, xs: 72 }}>
        <FlexBox align='end' justify='between' mb={{ sm: 48, xs: 24 }}>
          <Heading size={2}>Reviews</Heading>
          <Button
            aria-label='Submit product review'
            name='submit-review'
            onClick={(e: EventHandlers.Click.Button) => handleSubmitReview(e)}
            type='submit'
          >
            Submit Review
          </Button>
        </FlexBox>

        <Carousel id='product-review-carousel'>
          {review_chunks.map((chunk: IReview[]) => (
            <FlexBox direction='column' key={uuid()}>
              {chunk.map((review, i: number) => (
                <ProductReview
                  key={uuid()}
                  mb={i === chunk.length - 1 ? 0 : 36}
                  review={review}
                />
              ))}
            </FlexBox>
          ))}
        </Carousel>
      </Section>
    </Main>
  )
}

ProductTemplate.displayName = 'ProductTemplate'

ProductTemplate.defaultProps = {
  reviews: []
}

ProductTemplate.template_id = 'product'
