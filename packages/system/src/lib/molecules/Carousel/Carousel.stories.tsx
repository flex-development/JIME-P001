import { PRODUCTS, REVIEWS } from '@system-mocks/utils'
import { useProductImages } from '@system/hooks'
import { Image } from '@system/lib/atoms'
import { ProductReview } from '@system/lib/molecules/ProductReview'
import { Carousel } from './Carousel'
import type { CarouselProps } from './Carousel.props'

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
    jest: ['Carousel', 'useActiveIndex', 'useProductImages']
  },
  title: 'Library/Molecules/Carousel'
}

export const ProductImages: FCS<CarouselProps> = args => {
  const images = useProductImages(PRODUCTS.find(p => p.handle === 'ash-tray'))

  return (
    <Carousel {...args}>
      {images.map(image => (
        <Image {...image} $display='block' $fluid key={image.id} />
      ))}
    </Carousel>
  )
}

ProductImages.args = {
  children: [],
  style: {
    maxHeight: '600px',
    maxWidth: '438px'
  }
}

export const ProductReviews: FCS<CarouselProps> = args => <Carousel {...args} />

ProductReviews.args = {
  children: REVIEWS.map(review => (
    <ProductReview review={review} key={`review-${review.id}`} />
  )),
  position: REVIEWS.length - 3,
  style: {
    maxWidth: '1362px'
  }
}
