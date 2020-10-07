import { StoryFN } from '@kustomz-config/index'
import { Carousel, CarouselProps, Image, ProductReview } from '@kustomz/lib'
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
      src='rolling-tray-funfetti.png'
    />,
    <Image
      alt='Rolling Tray - JELLY $LIDES'
      className='d-block w-100'
      src='rolling-tray-jelly-slides.png'
    />,
    <Image
      alt='Rolling Tray - LA $ONRISA'
      className='d-block w-100'
      src='rolling-tray-la-sonrisa.png'
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
  children: [
    <ProductReview
      body='Odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget.'
      id='customer-review-0'
      name='Mickey Pellington'
    />,
    <ProductReview
      body='Eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum.'
      id='customer-review-1'
      name='Ingemar Quarrington'
    />,
    <ProductReview
      body='Justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt.'
      id='customer-review-2'
      name='Ibrahim Dowbekin'
    />
  ],
  style: {
    maxWidth: '1362px'
  }
}
