import type { IProductListing } from '@kustomzcore/types'
import { ProductImage } from '@system/lib/atoms/ProductImage'
import { ProductReview } from '@system/lib/molecules/ProductReview'
import { PRODUCTS, REVIEWS } from '@tests/system/__mocks__/utils'
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
    jest: ['Carousel', 'useActiveIndex']
  },
  title: 'Library/Molecules/Carousel'
}

const product = PRODUCTS.find(p => p.handle === 'ash-tray') as IProductListing
const { images, variants } = product

export const ProductImages: FCS<CarouselProps> = args => {
  return (
    <Carousel {...args}>
      {images.map(image => (
        <ProductImage
          $display='block'
          key={image.id}
          product={product}
          variant={variants.find(({ image_id }) => image_id === image.id)}
        />
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
