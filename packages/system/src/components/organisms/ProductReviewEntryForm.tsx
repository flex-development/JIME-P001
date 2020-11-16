import {
  AnyObject,
  ANYTHING,
  CreateProductReviewRequest,
  ProductResource
} from '@flex-development/types'
import { useMutatedProps, useProductVariants } from '@system/hooks'
import { EventHandlers } from '@system/types'
import { isEmpty } from 'lodash'
import React, { FC } from 'react'
import { useSetState } from 'react-hanger'
import isEmail from 'validator/lib/isEmail'
import {
  Button,
  FlexBox,
  Form,
  FormProps,
  Heading,
  Paragraph,
  Span
} from '../atoms'
import { FormCheck, LabeledFormControl, ProductRatingField } from '../molecules'

/**
 * @file Allow users to submit product reviews
 * @module components/organisms/ProductReviewEntryForm
 */

/**
 * `ProductReviewEntryForm` component properties.
 */
export interface ProductReviewEntryFormProps extends FormProps {
  /**
   * Form description.
   */
  description: string

  /**
   * Form submission handler. This function will be fired when the user clicks
   * the `submit` button.
   */
  handleSubmit?(
    review: Partial<CreateProductReviewRequest>,
    event: EventHandlers.Click.Button
  ): ANYTHING

  /**
   * The ID of the product the user is submitting a review for.
   */
  id: ProductResource['id']

  /**
   * The title of the product the user is submitting a review for.
   */
  title: ProductResource['title']

  /**
   * Product variants.
   *
   * @default []
   */
  variants: ProductResource['variants']
}

/**
 * Allows users to submit product reviews.
 *
 * Renders a `Form` component with the class `product-review-form`.
 */
export const ProductReviewEntryForm: FC<ProductReviewEntryFormProps> = (
  props: ProductReviewEntryFormProps
) => {
  const {
    description,
    handleSubmit = (
      review: Partial<CreateProductReviewRequest>,
      event: EventHandlers.Click.Button
    ) => {
      event.preventDefault()
      console.log('TODO: ProductReviewEntryForm.handleSubmit', review)
    },
    id,
    title,
    variants,
    ...rest
  } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'product-review-form')

  // Get product variants as options
  const { options, selectVariant, selected = {} } = useProductVariants(variants)

  // Product review entity state
  const { state: review, setState: updateReview } = useSetState<
    Partial<CreateProductReviewRequest>
  >({
    email: '',
    productId: selected.id,
    productSKU: selected.sku,
    reviewMessage: '',
    reviewRating: 5,
    reviewRecommendProduct: true,
    reviewTitle: ''
  })

  // Track form errors
  const { state: errors, setState: setErrors } = useSetState<AnyObject>({})

  return (
    <Form {...mutated} id={`product-review-form-${id}`}>
      <Heading className='product-review-form-title' mb={0} size={5}>
        <Span>Product Review</Span>

        <Span className='product-review-form-title-product-details'>
          <Span>{title}</Span> / <Span>{selected.title}</Span>
        </Span>
      </Heading>

      <Paragraph className='form-text product-review-form-text' my={12}>
        {description}
      </Paragraph>

      <LabeledFormControl
        data-selected={selected.title}
        control={{
          name: 'variant',
          onChange: ({ target: { value } }: EventHandlers.Change.Select) => {
            const variant = variants.find(v => v.id === value)

            selectVariant(value)
            updateReview({
              productId: JSON.parse(value),
              productImageUrl: variant?.image.src,
              productName: variant?.title,
              productSKU: variant?.sku
            })
          },
          options,
          placeholder: 'Select the product variant you purchased',
          required: true,
          value: selected.id
        }}
        name='select'
      >
        Style
      </LabeledFormControl>

      <LabeledFormControl
        control={{
          invalid: errors?.email,
          name: 'email',
          onChange: ({ target: { value } }: EventHandlers.Change.Input) => {
            const valid = isEmail(value)

            if (valid) updateReview({ email: value })

            setErrors({ email: !valid })
          },
          required: true,
          type: 'email'
        }}
      >
        Email address
      </LabeledFormControl>

      <LabeledFormControl
        control={{
          invalid: errors?.reviewTitle,
          name: 'reviewTitle',
          onChange: ({ target: { value } }: EventHandlers.Change.Input) => {
            const valid = value.length >= 3

            if (valid) updateReview({ reviewTitle: value })

            setErrors({ reviewTitle: !valid })
          },
          placeholder: 'A smoke worthy product',
          required: true
        }}
      >
        Review Title
      </LabeledFormControl>

      <LabeledFormControl
        control={{
          invalid: errors?.reviewMessage,
          name: 'reviewMessage',
          onChange: ({ target: { value } }: EventHandlers.Change.TextArea) => {
            const valid = value.length >= 10 && value.length <= 80

            if (valid) updateReview({ reviewMessage: value })

            setErrors({ reviewMessage: !valid })
          },
          placeholder:
            'Blue bottle single-origin coffee next level taxidermy four loko seitan cupidatat flannel. Cred asymmetrical literally vexillologist cliche do distillery hashtag raw denim crucifix everyday carry affogato austin. Williamsburg jean shorts raclette, aesthetic quinoa dolore hammock echo park taxidermy messenger bag.',
          required: true
        }}
        name='textarea'
      >
        Review Body
      </LabeledFormControl>

      <FlexBox
        align={{ sm: 'center' }}
        direction={{ sm: 'row', xs: 'column' }}
        mb={36}
        mt={8}
        justify={{ sm: 'between' }}
      >
        <FormCheck
          checked={review.reviewRecommendProduct}
          onChange={() => {
            updateReview(state => ({
              reviewRecommendProduct: !state.reviewRecommendProduct
            }))
          }}
          htmlFor='reviewRecommendProduct'
          label='Would you recommend this product?'
          name='reviewRecommendProduct'
        />

        <ProductRatingField
          className='pl-0-first w-70'
          mt={{ sm: 0, xs: 16 }}
          name='reviewRating'
          onChange={({ target }: EventHandlers.Change.Input) => {
            updateReview({ reviewRating: JSON.parse(target.value) })
          }}
        />
      </FlexBox>

      <Button
        aria-label='Submit product review'
        className='product-review-form-btn'
        disabled={isEmpty(errors) || Object.values(errors).includes(true)}
        mt={12}
        onClick={(e: EventHandlers.Click.Button) => handleSubmit(review, e)}
        type='submit'
      >
        Submit Review
      </Button>
    </Form>
  )
}

ProductReviewEntryForm.displayName = 'ProductReviewEntryForm'

ProductReviewEntryForm.defaultProps = {}
