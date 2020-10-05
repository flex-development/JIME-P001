import {
  ANYTHING,
  ProductResource,
  ProductReviewEntity
} from '@flex-development/kustomtypez'
import { useMutatedProps, useProductVariants } from '@kustomz/hooks'
import { HTMLButtonClickEvent, HTMLSelectChangeEvent } from '@kustomz/types'
import React, { FC } from 'react'
import {
  Box,
  Button,
  Form,
  FormProps,
  Heading,
  Paragraph,
  Span
} from '../atoms'
import { LabeledFormControl } from './LabeledFormControl'

/**
 * @file Allow users to submit product reviews
 * @module lib/molecules/ProductReviewForm
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
   * @param review - Product review entity
   * @param event - `click` event from submit button
   */
  submit?(review: ProductReviewEntity, event: HTMLButtonClickEvent): ANYTHING

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
 * - Implement form state and validation
 * - Disable submit button when form fields are invalid
 */
export const ProductReviewForm: FC<ProductReviewFormProps> = (
  props: ProductReviewFormProps
) => {
  const {
    description,
    id,
    submit = review => console.log('Submitted product review', review),
    title,
    variants,
    ...rest
  } = props

  const mutatedProps = useMutatedProps<typeof rest>(rest, 'product-review-form')

  // Get product variants as options
  const { options, selectVariant, selected = {} } = useProductVariants(variants)

  return (
    <Form {...mutatedProps} id={`product-review-form-${id}`}>
      <Heading className='product-review-form-title' size={5}>
        <Span>Product Review</Span>

        <Span className='product-review-form-title-product-details'>
          <Span>{title}</Span> / <Span>{selected.title}</Span>
        </Span>
      </Heading>

      <Paragraph className='form-text product-review-form-text'>
        {description}
      </Paragraph>

      <Box className='form-body product-review-form-body'>
        <LabeledFormControl
          data-selected={selected.title}
          control={{
            name: 'variant',
            onChange: (e: HTMLSelectChangeEvent) => {
              selectVariant(e.target.value)
            },
            options,
            placeholder: 'Select the product variant you purchased',
            value: selected.id
          }}
          name='select'
        >
          Style
        </LabeledFormControl>

        <LabeledFormControl
          control={{
            name: 'email',
            required: true,
            type: 'email'
          }}
        >
          Email address
        </LabeledFormControl>

        <LabeledFormControl
          control={{
            name: 'title',
            placeholder: 'A smoke worthy product',
            required: true
          }}
        >
          Review Title
        </LabeledFormControl>

        <LabeledFormControl
          control={{
            name: 'body',
            placeholder:
              'Blue bottle single-origin coffee next level taxidermy four loko seitan cupidatat flannel. Cred asymmetrical literally vexillologist cliche do distillery hashtag raw denim crucifix everyday carry affogato austin. Williamsburg jean shorts raclette, aesthetic quinoa dolore hammock echo park taxidermy messenger bag.'
          }}
          name='textarea'
        >
          Review Body
        </LabeledFormControl>
      </Box>

      <Box className='form-footer'>
        {/* TODO: Disable button when form fields are invalid */}
        <Button
          aria-label='Submit product review'
          className='product-review-form-btn'
          type='submit'
        >
          Submit Review
        </Button>
      </Box>
    </Form>
  )
}
