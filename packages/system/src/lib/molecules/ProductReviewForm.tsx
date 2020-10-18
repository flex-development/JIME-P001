import {
  AnyObject,
  ANYTHING,
  ProductResource,
  ProductReviewEntity,
  ProductReviewInput
} from '@flex-development/kustomtypez'
import { useMutatedProps, useProductVariants } from '@system/hooks'
import {
  HTMLButtonClickEvent,
  HTMLInputChangeEvent,
  HTMLSelectChangeEvent,
  HTMLTextAreaChangeEvent
} from '@system/types'
import { isEmpty } from 'lodash'
import React, { FC } from 'react'
import { useSetState } from 'react-hanger'
import isEmail from 'validator/lib/isEmail'
import { Button, Form, FormProps, Heading, Paragraph, Span } from '../atoms'
import { LabeledFormControl } from './LabeledFormControl'

/**
 * @file Allow users to submit product reviews
 * @module lib/molecules/ProductReviewForm
 *
 * @todo Update documentation
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
   * The ID of the product the user is submitting a review for.
   */
  id: ProductResource['id']

  /**
   * Form submission handler. This function will be fired when the user clicks
   * the `submit` button.
   *
   * @param review - User-populated product review fields
   * @param event - `click` event from submit button
   */
  submit?(review: ProductReviewInput, event: HTMLButtonClickEvent): ANYTHING

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
 * Renders a `Form` component that allows users to submit product reviews.
 *
 * **TODO**:
 *
 * - Update documentation
 */
export const ProductReviewForm: FC<ProductReviewFormProps> = (
  props: ProductReviewFormProps
) => {
  const {
    description,
    id,
    submit = (review: ProductReviewEntity, event: HTMLButtonClickEvent) => {
      event.preventDefault()
      console.log('Submitted product review', review)
    },
    title,
    variants,
    ...rest
  } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'product-review-form')

  // Get product variants as options
  const { options, selectVariant, selected = {} } = useProductVariants(variants)

  // Product review entity state
  const { state: review, setState: updateReview } = useSetState<
    ProductReviewInput
  >({
    body: '',
    email: '',
    product: id,
    title: '',
    variant: selected.id
  })

  // Track form errors
  const { state: errors, setState: setErrors } = useSetState<AnyObject>({})

  return (
    <Form {...mutated} id={`product-review-form-${id}`}>
      <Heading className='product-review-form-title' size={5}>
        <Span>Product Review</Span>

        <Span className='product-review-form-title-product-details'>
          <Span>{title}</Span> / <Span>{selected.title}</Span>
        </Span>
      </Heading>

      <Paragraph className='form-text product-review-form-text'>
        {description}
      </Paragraph>

      <LabeledFormControl
        data-selected={selected.title}
        control={{
          name: 'variant',
          onChange: ({ target: { value } }: HTMLSelectChangeEvent) => {
            selectVariant(value)
            updateReview({ variant: value })
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
          onChange: ({ target: { value } }: HTMLInputChangeEvent) => {
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
          onChange: ({ target: { value } }: HTMLInputChangeEvent) => {
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
          onChange: ({ target: { value } }: HTMLTextAreaChangeEvent) => {
            const valid = value.length >= 3

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

      <Button
        aria-label='Submit product review'
        className='product-review-form-btn'
        disabled={isEmpty(errors) || Object.values(errors).includes(true)}
        onClick={(event: HTMLButtonClickEvent) => submit(review, event)}
        type='submit'
      >
        Submit Review
      </Button>
    </Form>
  )
}
