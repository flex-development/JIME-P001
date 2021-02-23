import type { AnyObject } from '@flex-development/json'
import type { CreateReviewRequest } from '@kustomzcore'
import { useProductVariants } from '@system/hooks/useProductVariants'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Button } from '@system/lib/atoms/Button'
import type { FormProps } from '@system/lib/atoms/Form'
import { Form } from '@system/lib/atoms/Form'
import { Heading } from '@system/lib/atoms/Heading'
import { Input } from '@system/lib/atoms/Input'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import { Select } from '@system/lib/atoms/Select'
import { Span } from '@system/lib/atoms/Span'
import { TextArea } from '@system/lib/atoms/TextArea'
import { FormField } from '@system/lib/molecules/FormField'
import { ProductRating } from '@system/lib/molecules/ProductRating'
import type { EventHandlers } from '@system/types'
import type { FC } from 'react'
import { useSetState } from 'react-hanger'
import type { ProductReviewFormProps } from './ProductReviewForm.props'

/**
 * @file Implementation - ProductReviewForm
 * @module lib/molecules/ProductReviewForm/impl
 */

/**
 * Allows users to submit product reviews.
 *
 * Renders a `Form` component with the class `product-review-form`.
 */
export const ProductReviewForm: FC<ProductReviewFormProps> & {
  BODY_PLACEHOLDER: string
  SELECT_PLACEHOLDER: string
  TITLE_PLACEHOLDER: string
} = props => {
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

  const sanitized = useSanitizedProps<'form', FormProps>(
    rest,
    'product-review-form'
  )

  // Get product variants as options
  const { options, selectVariant, selected } = useProductVariants(variants)

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
    <Form {...sanitized} id={`product-review-form-${id}`}>
      <Heading $size={5} className='product-review-form-title'>
        <Span>Product Review</Span>

        <Span className='product-review-form-title-product-details'>
          <Span>{title}</Span> / <Span>{selected.title}</Span>
        </Span>
      </Heading>

      <Paragraph $form className='product-review-form-text'>
        {description}
      </Paragraph>

      <FormField data-control='select' label='Style'>
        <Select
          $options={options}
          data-selected={selected.title}
          name='variant'
          onChange={({ target: { value } }: EventHandlers.Change.Select) => {
            const parsed_value = JSON.parse(value)

            const variant = variants.find(v => v.id === parsed_value)

            selectVariant(parsed_value)
            updateReview({ product_sku: variant?.sku })
          }}
          placeholder={ProductReviewForm.SELECT_PLACEHOLDER}
          required
          value={selected.id}
        />
      </FormField>

      <FormField data-control='input' data-type='email' label='Email address'>
        <Input
          data-invalid={errors.email}
          name='email'
          onChange={({ target: { value } }: EventHandlers.Change.Input) => {
            const valid = (() => {
              const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

              return regex.test(String(value).toLowerCase())
            })()

            if (valid) updateReview({ email: value })

            setErrors({ email: !valid })
          }}
          required
          type='email'
        />
      </FormField>

      <FormField data-control='input' data-type='text' label='Review Title'>
        <Input
          data-invalid={errors?.title}
          name='title'
          onChange={({ target: { value } }: EventHandlers.Change.Input) => {
            const valid = value.length >= 3

            if (valid) updateReview({ title: value })

            setErrors({ title: !valid })
          }}
          placeholder={ProductReviewForm.TITLE_PLACEHOLDER}
          required
        />
      </FormField>

      <FormField data-control='textarea' label='Review Body'>
        <TextArea
          data-invalid={errors?.body}
          name='body'
          onChange={({ target: { value } }: EventHandlers.Change.TextArea) => {
            const valid = value.length >= 10 && value.length <= 80

            if (valid) updateReview({ body: value })

            setErrors({ body: !valid })
          }}
          placeholder={ProductReviewForm.BODY_PLACEHOLDER}
          required
        />
      </FormField>

      <FormField label='Product Rating'>
        <ProductRating
          className='product-review-form-rating'
          name='rating'
          onChange={({ target }: EventHandlers.Change.Input) => {
            updateReview({ rating: JSON.parse(target.value) })
          }}
        />
      </FormField>

      <Button
        aria-label='Submit product review'
        className='product-review-form-btn'
        disabled={
          !Object.keys(errors).length || Object.values(errors).includes(true)
        }
        onClick={(e: EventHandlers.Click.Button) => handleSubmit(review, e)}
        type='submit'
      >
        Submit Review
      </Button>
    </Form>
  )
}

ProductReviewForm.displayName = 'ProductReviewForm'

ProductReviewForm.BODY_PLACEHOLDER =
  'Blue bottle single-origin coffee next level taxidermy four loko seitan cupidatat flannel. Cred asymmetrical literally vexillologist cliche do distillery hashtag raw denim crucifix everyday carry affogato austin. Williamsburg jean shorts raclette, aesthetic quinoa dolore hammock echo park taxidermy messenger bag.'
ProductReviewForm.SELECT_PLACEHOLDER = 'Select the variant you purchased'
ProductReviewForm.TITLE_PLACEHOLDER = 'A smoke worthy product'

ProductReviewForm.defaultProps = {}
