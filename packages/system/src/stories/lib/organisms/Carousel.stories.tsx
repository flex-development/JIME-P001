import { REVIEWS } from '@system-mocks/utils'
import { Carousel, CarouselProps, ProductReview } from '@system/components'
import { StoryFN } from '@system/types/storybook'
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
    jest: ['Carousel', 'useActiveIndex']
  },
  title: 'Library/Organisms/Carousel'
}

export const ProductReviews: StoryFN<CarouselProps> = (args: CarouselProps) => (
  <Carousel {...args} />
)

ProductReviews.args = {
  children: REVIEWS.map(review => (
    <ProductReview review={review} key={`review-${review.id}`} />
  )),
  position: REVIEWS.length - 3,
  style: {
    maxWidth: '1362px'
  }
}
