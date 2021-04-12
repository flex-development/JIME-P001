import kapi from '@core/config/axios-kapi'
import CreateReviewDTO from '@core/models/CreateReviewDTO'
import type {
  JudgeMeReviewCreateDataDTO as ReviewDTO,
  NumberString,
  OrNever
} from '@core/types'
import type { ErrorJSON } from '@core/types/errors'
import { ReviewRating } from '@core/types/reviews'
import type { AnyObject } from '@flex-development/json/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Box } from '@system/lib/atoms/Box'
import { Button } from '@system/lib/atoms/Button'
import type { FormProps } from '@system/lib/atoms/Form'
import { Form } from '@system/lib/atoms/Form'
import { Heading } from '@system/lib/atoms/Heading'
import { Input } from '@system/lib/atoms/Input'
import { Label } from '@system/lib/atoms/Label'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import { Span } from '@system/lib/atoms/Span'
import { TextArea } from '@system/lib/atoms/TextArea'
import { FormField } from '@system/lib/molecules/FormField'
import { ProductRating } from '@system/lib/molecules/ProductRating'
import isFunction from 'lodash/isFunction'
import ip from 'public-ip'
import type { BaseSyntheticEvent, FC } from 'react'
import { useCallback } from 'react'
import useSetState from 'react-hanger/array/useSetState'
import { useForm } from 'react-hook-form'
import type { HReview, ProductReviewFormProps } from './ProductReviewForm.props'

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
  TITLE_PLACEHOLDER: string
} = props => {
  const {
    handler = (hreview: HReview, event?: BaseSyntheticEvent) => {
      event?.preventDefault()
      console.log('TODO: ProductReviewForm.handler', hreview)
    },
    id,
    title,
    ...rest
  } = props

  const sanitized = useSanitizedProps<'form', FormProps>(
    rest,
    'product-review-form'
  )

  // Handle form state
  const {
    formState: {
      errors,
      isDirty,
      isSubmitSuccessful,
      isSubmitting,
      isValid,
      submitCount
    },
    handleSubmit,
    register
  } = useForm<ReviewDTO>({
    defaultValues: { body: '', email: '', id, rating: 5, title: null },
    mode: 'all',
    resolver: zodResolver(CreateReviewDTO)
  })

  // Handle submission error state
  const [ejson, setError] = useSetState<ErrorJSON | AnyObject>({})

  // Disable form submission
  const disabled = !(isDirty && isValid) || isSubmitting || submitCount === 1

  /**
   * Sends a product review to the Kustomz API (KAPI).
   *
   * @async
   * @param {ReviewDTO} data - Product review data
   * @param {string} data.body - Review body; [1,500]
   * @param {string} data.email - Reviewer email
   * @param {NumberString} data.id - Product ID
   * @param {ReviewRating} [data.rating] - Review rating; [1,5]
   * @param {string} [data.title] - Review title; [0,100]
   * @param {BaseSyntheticEvent} [event] - Form event
   * @return {Promise<ReviewDTO>} Product review data
   * @throws {ErrorJSON}
   */
  const onValid = async (
    data: ReviewDTO,
    event?: BaseSyntheticEvent
  ): OrNever<Promise<typeof data>> => {
    const NENV = (process.env.NODE_ENV || 'development').toLowerCase()
    const VENV = (process.env.VERCEL_ENV || 'development').toLowerCase()

    let review = {} as ReviewDTO

    try {
      if (NENV === 'development' || VENV === 'development' || NENV === 'test') {
        review = { ...data, ip_addr: await ip.v4() }
      } else {
        review = await kapi({ data, method: 'post', url: '/reviews' })
      }

      if (isFunction(handler)) await handler(review, event)
    } catch (error) {
      setError(error)
    }

    return review
  }

  /* Callback version of `onValid` */
  const onValidCB = useCallback(onValid, [handler, setError])

  const onSubmit = handleSubmit(onValidCB)

  return (
    <Form {...sanitized} id={`product-review-form-${id}`} onSubmit={onSubmit}>
      <Heading $size={5} className='product-review-form-title'>
        <Span>Product Review</Span>
        <Span>{title}</Span>
      </Heading>

      <Box className='product-review-form-fields'>
        <Box className='product-review-form-field'>
          <FormField
            data-control='input'
            data-type='email'
            label='Email address'
          >
            <Input
              {...register('email')}
              aria-label='email'
              name='email'
              required
              type='email'
            />
          </FormField>
          <Label className='product-review-form-field-label'>
            {errors.email?.message}
          </Label>
        </Box>

        <Box className='product-review-form-field'>
          <FormField data-control='input' data-type='text' label='Review Title'>
            <Input
              {...register('title')}
              aria-label='title'
              name='title'
              placeholder={ProductReviewForm.TITLE_PLACEHOLDER}
            />
          </FormField>
          <Label className='product-review-form-field-label'>
            {errors.title?.message}
          </Label>
        </Box>

        <Box className='product-review-form-field'>
          <FormField data-control='textarea' label='Review Body'>
            <TextArea
              {...register('body')}
              aria-label='body'
              name='body'
              placeholder={ProductReviewForm.BODY_PLACEHOLDER}
              required
            />
          </FormField>
          <Label className='product-review-form-field-label'>
            {errors.body?.message}
          </Label>
        </Box>
      </Box>

      <Box className='product-review-form-footer'>
        <Box>
          <ProductRating className='product-review-form-rating' name='rating' />

          <Button
            aria-label='Submit review'
            className='product-review-form-btn'
            data-submit-successful={isSubmitSuccessful}
            disabled={disabled}
            onClick={onSubmit}
            type='submit'
          >
            Submit Review
          </Button>
        </Box>

        <Paragraph className='product-review-form-error-message'>
          {ejson.message}
        </Paragraph>
      </Box>
    </Form>
  )
}

ProductReviewForm.displayName = 'ProductReviewForm'

ProductReviewForm.BODY_PLACEHOLDER =
  'Church-key glossier sint intelligentsia tumblr, pour-over paleo kogi tousled excepteur magna banh mi af. Blue bottle pickled gluten-free, waistcoat adaptogen cupidatat veniam man braid edison bulb eiusmod 8-bit retro. Wayfarers meditation pork belly keffiyeh, raw denim lumbersexual direct trade glossier hammock fam. Veniam man braid edison bulb eiusmod 8-bit retro. Raw denim lumbersexual direct trade glossier hammock fam, blue bottle pickled gluten-free. Stet clita ka gubergren, no sea takimata.'
ProductReviewForm.TITLE_PLACEHOLDER = 'A smoke worthy product'

ProductReviewForm.defaultProps = {}
