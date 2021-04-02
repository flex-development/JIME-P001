import { Carousel } from './Carousel'
import type { CarouselProps } from './Carousel.props'
import PRODUCT_IMAGES from './__tests__/__fixtures__/product-image-components'
import PRODUCT_REVIEWS from './__tests__/__fixtures__/product-review-components'

/**
 * @file Stories - Carousel
 * @module lib/molecules/Carousel/stories
 */

export default {
  argTypes: {
    children: { control: 'array' }
  },
  component: Carousel,
  parameters: {
    jest: ['Carousel']
  },
  title: 'Library/Molecules/Carousel'
}

export const ProductImages: FCS<CarouselProps> = args => {
  return <Carousel {...args} />
}

ProductImages.args = {
  children: PRODUCT_IMAGES,
  style: {
    maxHeight: '600px',
    maxWidth: '438px'
  }
}

export const ProductReviews: FCS<CarouselProps> = args => <Carousel {...args} />

ProductReviews.args = {
  children: PRODUCT_REVIEWS,
  position: PRODUCT_REVIEWS.length - 3,
  style: {
    maxWidth: '1362px'
  }
}
