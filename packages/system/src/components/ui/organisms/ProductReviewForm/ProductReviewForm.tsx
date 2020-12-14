import { AnyObject, ANYTHING } from '@flex-development/json'
import { CreateReviewRequest } from '@flex-development/kustomzcore'
import {
  Button,
  FlexBox,
  Form,
  FormProps,
  Heading,
  Paragraph,
  Span
} from '@system/components/ui/atoms'
import {
  LabeledFormControl,
  ProductRatingField
} from '@system/components/ui/molecules'
import { useProductVariants, useSanitizedProps } from '@system/hooks'
import { EventHandlers, FREC } from '@system/types'
import { isEmpty } from 'lodash'
import { forwardRef } from 'react'
import { useSetState } from 'react-hanger'
import { IProductListing } from 'shopify-api-node'
import isEmail from 'validator/lib/isEmail'

/**
 * @file Allow users to submit product reviews
 * @module components/ui/organisms/ProductReviewForm/impl
 */

/**
 * `ProductReviewForm` component properties.
 */
export interface ProductReviewFormProps extends FormProps {
  /**
   * Form description.
   */
  description: string

  /**
   * Form submission handler. This function will be fired when the user clicks
   * the `submit` button.
   */
  handleSubmit?(
    req: Omit<CreateReviewRequest, 'product_id'>,
    event: EventHandlers.Click.Button
  ): ANYTHING

  /**
   * The ID of the product the user is submitting a review for.
   */
  id: string

  /**
   * The title of the product the user is submitting a review for.
   */
  title: IProductListing['title']

  /**
   * Product variants.
   *
   * @default []
   */
  variants: IProductListing['variants']
}

/**
 * Allows users to submit product reviews.
 *
 * Renders a `Form` component with the class `product-review-form`.
 */
export const ProductReviewForm: FREC<ProductReviewFormProps> = forwardRef(
  (props, ref) => {
    const {
      description,
      handleSubmit = (
        req: Omit<CreateReviewRequest, 'product_id'>,
        event: EventHandlers.Click.Button
      ) => {
        event.preventDefault()
        console.log('TODO: ProductReviewForm.handleSubmit', review)
      },
      id,
      title,
      variants,
      ...rest
    } = props

    const sanitized = useSanitizedProps<typeof rest>(
      rest,
      'product-review-form'
    )

    // Get product variants as options
    const { options, selectVariant, selected = {} } = useProductVariants(
      variants
    )

    // Product review entity state
    const { state: review, setState: updateReview } = useSetState<
      Omit<CreateReviewRequest, 'product_id'>
    >({
      body: '',
      email: '',
      product_sku: selected.sku,
      rating: 5,
      title: ''
    })

    // Track form errors
    const { state: errors, setState: setErrors } = useSetState<AnyObject>({})

    return (
      <Form {...sanitized} id={`product-review-form-${id}`} ref={ref}>
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
              const parsed_value = JSON.parse(value)

              const variant = variants.find(v => v.id === parsed_value)

              selectVariant(parsed_value)
              updateReview({ product_sku: variant?.sku })
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
            invalid: errors?.title,
            name: 'title',
            onChange: ({ target: { value } }: EventHandlers.Change.Input) => {
              const valid = value.length >= 3

              if (valid) updateReview({ title: value })

              setErrors({ title: !valid })
            },
            placeholder: 'A smoke worthy product',
            required: true
          }}
        >
          Review Title
        </LabeledFormControl>

        <LabeledFormControl
          control={{
            invalid: errors?.body,
            name: 'body',
            onChange: ({
              target: { value }
            }: EventHandlers.Change.TextArea) => {
              const valid = value.length >= 10 && value.length <= 80

              if (valid) updateReview({ body: value })

              setErrors({ body: !valid })
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
          <ProductRatingField
            className='pl-0-first w-70'
            mt={{ sm: 0, xs: 16 }}
            name='rating'
            onChange={({ target }: EventHandlers.Change.Input) => {
              updateReview({ rating: JSON.parse(target.value) })
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
)

ProductReviewForm.displayName = 'ProductReviewForm'

ProductReviewForm.defaultProps = {}
