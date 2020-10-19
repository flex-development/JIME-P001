import { Carousel, CarouselProps, Image, ProductReview } from '@system/lib'
import { StoryFN } from '@system/types'
import { getProductReviewProps } from '@system/utils'
import reviews from '@system/__mocks__/reviews.mock.json'
import React from 'react'

/**
 * @file Stories - Carousel
 * @module stories/lib/organisms/Carousel
 */

export default {
  argTypes: {
    children: { control: 'array' }
  },
  component: Carousel,
  parameters: {
    jest: ['Carousel', 'useCarouselPlugin']
  },
  title: 'Library/Organisms/Carousel'
}

export const ProductImages: StoryFN<CarouselProps> = (args: CarouselProps) => (
  <Carousel {...args} />
)

ProductImages.args = {
  children: [
    <Image
      alt='Rolling Tray - FUNFETTI'
      className='d-block w-100'
      key='funfetti'
      src='assets/rolling-tray-funfetti.png'
    />,
    <Image
      alt='Rolling Tray - JELLY $LIDES'
      className='d-block w-100'
      key='jelly-slides'
      src='assets/rolling-tray-jelly-slides.png'
    />,
    <Image
      alt='Rolling Tray - LA $ONRISA'
      className='d-block w-100'
      key='la-sonrisa'
      src='assets/rolling-tray-la-sonrisa.png'
    />
  ],
  position: 2,
  style: {
    maxHeight: '600px',
    maxWidth: '438px'
  }
}

export const ProductReviews: StoryFN<CarouselProps> = (args: CarouselProps) => (
  <Carousel {...args} />
)

ProductReviews.args = {
  children: reviews.map(review => (
    <ProductReview {...getProductReviewProps(review)} key={review.id} />
  )),
  style: {
    maxWidth: '1362px'
  }
}
