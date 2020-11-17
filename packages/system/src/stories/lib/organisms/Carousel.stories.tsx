import items from '@app-mocks/data/checkout-line-items.mock.json'
import { REVIEWS } from '@system-mocks/utils'
import {
  Carousel,
  CarouselProps,
  CheckoutLineItemProps,
  Image,
  ProductReview
} from '@system/components'
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

export const ProductImages: StoryFN<CarouselProps> = (args: CarouselProps) => (
  <Carousel {...args} />
)

ProductImages.args = {
  children: items.map((item: CheckoutLineItemProps) => {
    return (
      <Image
        alt={item.image.alt || item.item.title}
        className='d-block w-100'
        key={item.item.key}
        src={item.image.src}
      />
    )
  }),
  position: items.length - 1,
  style: {
    maxHeight: '600px',
    maxWidth: '438px'
  }
}

export const ProductReviews: StoryFN<CarouselProps> = (args: CarouselProps) => (
  <Carousel {...args} />
)

ProductReviews.args = {
  children: REVIEWS.map(review => (
    <ProductReview review={review} key={`review-${review.id}`} />
  )),
  style: {
    maxWidth: '1362px'
  }
}
