import { IProductListingVariant } from '@flex-development/kustomzcore'
import { useCartContext, useSanitizedProps } from '@system/hooks'
import {
  Box,
  Button,
  Heading,
  Main,
  MainProps,
  Section
} from '@system/lib/atoms'
import {
  AddToCartForm,
  AddToCartFormProps,
  Carousel,
  ProductBreadcrumb,
  ProductReview
} from '@system/lib/molecules'
import { EventHandlers, TC } from '@system/types'
import { isFunction } from 'lodash'
import { useCallback, useState } from 'react'
import { ProductTemplateProps } from './ProductTemplate.props'

/**
 * @file Implementation - ProductTemplate
 * @module lib/templates/ProductTemplate/impl
 */

/**
 * Displays information about a Shopify product resource. Users can add the
 * product to their cart, browse product reviews, as well as leave reviews.
 *
 * Renders a `Main` component with the classes `template` and
 * `product-template`, as well as the attribute `data-template='product'`.
 */
export const ProductTemplate: TC<ProductTemplateProps> = props => {
  const {
    active = 0,
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

  const sanitized = useSanitizedProps<'main', MainProps>(
    rest,
    'product-template'
  )

  // Get cart actions
  const cart = useCartContext()

  // Selected variant
  const initial_index = active < 0 ? 0 : active
  const [variant, setVariant] = useState(product.variants[initial_index])

  /**
   * Adds a product variant to the user's cart.
   *
   * If `props.handleAddToCart` is defined, it will be called before updated the
   * line items state.
   *
   * @param item - New checkout line item
   * @param e - `click` event from `<button>` element
   */
  const _handleAddToCart: AddToCartFormProps['handleSubmit'] = (item, e) => {
    e.preventDefault()
    if (isFunction(handleAddToCart)) handleAddToCart(item, e)
    return cart.upsertItem(item)
  }

  // Callback version of `handleAddToCart`
  const _handleAddToCartCB = useCallback(_handleAddToCart, [
    cart,
    handleAddToCart
  ])

  /**
   * Updates the selected product variant state.
   *
   * @param id - ID of newly selected variant
   */
  const handleVariant = (id: IProductListingVariant['id']) => {
    const new_variant = product.variants.find(v => v.id === id)
    if (new_variant) setVariant(new_variant)
  }

  // Callback version of `handleVariant`
  const handleVariantCB = useCallback(handleVariant, [product.variants])

  // Callback version of `handleSubmitReview`
  const handleSubmitReviewCB = useCallback(handleSubmitReview, [
    handleSubmitReview
  ])

  return (
    <Main {...sanitized} data-template={ProductTemplate.template_id}>
      <ProductBreadcrumb
        className='product-template-breadcrumb'
        collection={collection}
        product={product.title}
        variant={variant.title}
      />

      <AddToCartForm
        active={active}
        handleSubmit={_handleAddToCartCB}
        handleVariant={handleVariantCB}
        product={product}
      />

      {process.env.NODE_ENV === 'development' && (
        <Section className='product-template-reviews' id='reviews'>
          <Box className='product-template-reviews-header'>
            <Heading $size={2}>Reviews</Heading>
            <Button
              $scale
              aria-label='Submit product review'
              name='submit-review'
              onClick={handleSubmitReviewCB}
              type='submit'
            >
              Submit Review
            </Button>
          </Box>

          {reviews?.length && (
            <Carousel
              chunk_max={reviews_chunk_max}
              className='product-template-carousel'
              id='product-review-carousel'
            >
              {reviews.map((review, i: number) => (
                <ProductReview key={`product-review-${i}`} review={review} />
              ))}
            </Carousel>
          )}
        </Section>
      )}
    </Main>
  )
}

ProductTemplate.displayName = 'ProductTemplate'

ProductTemplate.defaultProps = {
  active: 0,
  reviews: []
}

ProductTemplate.template_id = 'product'
